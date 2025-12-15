import { useState } from "react";
import "./ProductPage.css";

const similarProducts = [
  {
    id: 1,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/new1.jpg",
    link: "/",
  },
  {
    id: 2,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/new2.jpg",
    link: "/",
  },
  {
    id: 3,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/new3.jpeg",
    link: "/",
  },
  {
    id: 4,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/new4.jpg",
    link: "/",
  },
  {
    id: 5,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/new5.jpg",
    link: "/",
  },
];

export default function ProductPage() {
  const [size, setSize] = useState("1");
  const [color, setColor] = useState("olive");
  const [qty, setQty] = useState(1);

  return (
    <div className="big-container">
      <div className="product-page">
        {/* ---- تصاویر ---- */}
        <div className="product-gallery">
          <img src="/best5.jpeg" className="main-image" alt="main" />

          <div className="thumbs">
            <img src="/best2.jpg" alt="" />
            <img src="/best3.jpg" alt="" />
            <img src="/best3.jpg" alt="" />
            <img src="/best3.jpg" alt="" />
          </div>
        </div>

        {/* ---- جزئیات محصول ---- */}
        <div className="product-info">
          <h1 className="title">کت و شلوار مدل سونار کد 1892</h1>

          {/* سایز */}
          <div className="block">
            <h3>سایز:</h3>
            <select
              className="size-option"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option className="size-option" value="1">
                سایز 1
              </option>
              <option className="size-option" value="2">
                سایز 2
              </option>
              <option className="size-option" value="3">
                سایز 3
              </option>
            </select>
          </div>

          {/* رنگ‌ها */}
          <div className="block">
            <h3>رنگ‌های موجود در این سایز:</h3>
            <div className="colors">
              <button
                className={color === "olive" ? "color-btn active" : "color-btn"}
                onClick={() => setColor("olive")}
              />
              <button
                className={color === "black" ? "color-btn active" : "color-btn"}
                onClick={() => setColor("black")}
              />
              <button
                className={color === "navy" ? "color-btn active" : "color-btn"}
                onClick={() => setColor("navy")}
              />
              <button
                className={
                  color === "purple" ? "color-btn active" : "color-btn"
                }
                onClick={() => setColor("purple")}
              />
            </div>
          </div>

          {/* قیمت */}
          <p className="price">۳,۱۱۸,۰۰۰ تومان</p>

          {/* تعداد */}
          <div className="qty-box">
            <span className="qty-label">تعداد:</span>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span className="qty-num">{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* دکمه خرید */}
          <button className="add-to-cart">افزودن به سبد خرید</button>

          {/* ویژگی‌ها */}
          <div className="features">
            <div>نحوه بسته شدن: دکمه</div>
            <div>قد: بالای زانو</div>
            <div>جنس: نخ پنبه</div>
            <div>تنخور: آزاد</div>
            <div>مدل یقه: انگلیسی</div>
          </div>
        </div>
        {/* محصولات مشابه */}
      </div>
      <div className="new-products-section">
        <h2 className="section-title">محصولات مشابه:</h2>
        <div className="product-list">
          {similarProducts.map((product) => (
            <a href={product.link} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="see-all">
          <a href="/products" className="see-all-btn">
            مشاهده همه
          </a>
        </div>
      </div>
    </div>
  );
}
