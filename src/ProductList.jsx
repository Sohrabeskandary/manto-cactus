import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteProduct = async (id) => {
    if (!window.confirm("محصول حذف شود؟")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>لیست محصولات</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "16px",
            padding: "12px",
          }}
        >
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>قیمت پایه: {product.base_price}</p>

          <strong>واریانت‌ها:</strong>
          <ul>
            {product.variants.map((v) => (
              <li key={v.id}>
                {v.size} | {v.color} | قیمت: {v.price} | موجودی: {v.stock}
              </li>
            ))}
          </ul>
          <button
            onClick={() => deleteProduct(product.id)}
            style={{ marginTop: "8px", color: "red" }}
          >
            حذف محصول
          </button>
          <button
            onClick={() => {
              setProduct({
                title: product.title,
                description: product.description,
                category_id: product.category_id,
                base_price: Number(product.base_price),
              });
              setEditingId(product.id);
              setStep(1);
            }}
          >
            ویرایش
          </button>
        </div>
      ))}
    </div>
  );
}
