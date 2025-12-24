import "./ProductList.css";
function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          {/* گالری تصاویر */}
          <div className="product-images">
            {p.images?.length > 0 ? (
              <img
                src={`http://localhost:5000/uploads/${p.images[0].filename}`}
                alt={p.title}
              />
            ) : (
              <div className="no-image">بدون تصویر</div>
            )}
          </div>

          <h3>{p.title}</h3>
          <p>{p.base_price} تومان</p>

          <div className="actions">
            <button onClick={() => onEdit(p)}>ویرایش</button>
            <button onClick={() => onDelete(p.id)}>حذف</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
