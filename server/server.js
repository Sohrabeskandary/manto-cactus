import express from "express";
import cors from "cors";
import pkg from "pg";

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

app.post("/api/products", async (req, res) => {
  const { product, variants } = req.body;
  const client = await pool.connect();

  try {
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

    // insert variants
    for (const v of variants) {
      await client.query(
        `
        INSERT INTO variants (product_id, size, color, price, stock)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [productId, v.size, v.color, v.price, v.stock]
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

    const products = productsResult.rows.map((product) => ({
      ...product,
      variants: variantsResult.rows.filter((v) => v.product_id === product.id),
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  try {
    await pool.query(
      `
      UPDATE products
      SET title = $1,
          description = $2,
          category_id = $3,
          base_price = $4
      WHERE id = $5
      `,
      [
        product.title,
        product.description,
        product.category_id,
        product.base_price,
        id,
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
