import express from "express";
import cors from "cors";
import pkg from "pg";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Pg12344321",
  database: "cactus",
  port: 5432,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  },
});

const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static("uploads"));

app.post("/api/products", upload.array("images", 10), async (req, res) => {
  const client = await pool.connect();

  try {
    const product = JSON.parse(req.body.product);
    const variants = JSON.parse(req.body.variants);
    const images = req.files;

    console.log("variants from admin:", variants); //test the variants

    await client.query("BEGIN");

    // insert product
    const productResult = await client.query(
      `
      INSERT INTO products (title, description, category_id, base_price)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [
        product.title,
        product.description,
        product.category_id,
        product.base_price,
      ]
    );

    const productId = productResult.rows[0].id;

    // insert variants (UPDATED)
    for (const v of variants) {
      await client.query(
        `
        INSERT INTO variants 
        (product_id, size, color, color_hex, price, stock)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [productId, v.size, v.color, v.color_hex, v.price, v.stock]
      );
    }

    // insert images
    for (const img of images) {
      await client.query(
        `
        INSERT INTO product_images (product_id, filename)
        VALUES ($1, $2)
        `,
        [productId, img.filename]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    client.release();
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const productsResult = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );

    const variantsResult = await pool.query("SELECT * FROM variants");
    const imagesResult = await pool.query("SELECT * FROM product_images");

    const products = productsResult.rows.map((product) => ({
      ...product,
      variants: variantsResult.rows.filter((v) => v.product_id === product.id),
      images: imagesResult.rows.filter((img) => img.product_id === product.id),
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, title, base_price, description FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/products/:id/variants", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        id,
        size,
        color,
        stock,
        color_hex
      FROM variants
      WHERE product_id = $1
      ORDER BY size
      `,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/products/:id/images", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, filename FROM product_images WHERE product_id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. get product images
    const imagesResult = await client.query(
      "SELECT filename FROM product_images WHERE product_id = $1",
      [id]
    );

    // 2. delete image files from uploads
    for (const img of imagesResult.rows) {
      const filePath = path.join(__dirname, "uploads", img.filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 3. delete image records
    await client.query("DELETE FROM product_images WHERE product_id = $1", [
      id,
    ]);

    // 4. delete variants
    await client.query("DELETE FROM variants WHERE product_id = $1", [id]);

    // 5. delete product
    await client.query("DELETE FROM products WHERE id = $1", [id]);

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    client.release();
  }
});

app.put("/api/products/:id", upload.none(), async (req, res) => {
  console.log("PUT BODY:", req.body);

  const { id } = req.params;

  const product = JSON.parse(req.body.product);
  const variants = JSON.parse(req.body.variants);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE products
        SET title=$1, description=$2, category_id=$3, base_price=$4
        WHERE id=$5
        `,
      [
        product.title,
        product.description,
        product.category_id,
        product.base_price,
        id,
      ]
    );

    await client.query("DELETE FROM variants WHERE product_id=$1", [id]);

    for (const v of variants) {
      await client.query(
        `
          INSERT INTO variants (product_id, size, color, price, stock)
          VALUES ($1,$2,$3,$4,$5)
          `,
        [id, v.size, v.color, v.price, v.stock]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    client.release();
  }
});

app.get("/api/products/:id/images", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM product_images WHERE product_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
