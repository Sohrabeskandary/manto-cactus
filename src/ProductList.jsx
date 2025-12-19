export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div>
      <h2>محصولات ثبت‌شده</h2>

      {products.map((p) => (
        <div key={p.id}>
          <h4>{p.title}</h4>

          {p.variants.map((v) => (
            <div key={v.id}>
              {v.size} | {v.color} | {v.price} | {p.description}
            </div>
          ))}

          <button onClick={() => onEdit(p)}>ویرایش</button>
          <button onClick={() => onDelete(p.id)}>حذف</button>
        </div>
      ))}
    </div>
  );
}
