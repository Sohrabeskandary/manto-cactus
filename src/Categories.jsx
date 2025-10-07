import "./styles.css";

const categories = [
  { id: 1, name: "مانتو", image: "/manto.jpg", link: "/products/manto" },
  { id: 2, name: "شومیز", image: "/shomiz.jpeg", link: "/products/shomiz" },
  { id: 3, name: "پالتو", image: "/palto.jpeg", link: "/products/palto" },
  { id: 4, name: "کت", image: "/cot.jpg", link: "/products/cot" },
];

export default function CategorySection() {
  return (
    <section className="category-section">
      <h2 className="section-title">دسته‌بندی محصولات</h2>
      <div className="categories">
        {categories.map((item) => (
          <a href={item.link} key={item.id} className="category-card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />
            </div>
            <p>{item.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
