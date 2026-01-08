export default function ProductCard({ product }) {
  return (
    <a href={`/products/${product.id}`} className="product-card">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
      />
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">
          {Number(product.price).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </a>
  );
}
