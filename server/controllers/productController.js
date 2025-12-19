import pool from "../db.js";

/**
 * GET products with category
 */
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.productName,
        p.description,
        c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/**
 * CREATE product
 */
export const createProduct = async (req, res) => {
  const { productName, description, category_id } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (productName, description, category_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [productName, description, category_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};
