// NewProducts.jsx
import React from "react";
import "./NewProducts.css";

const newProducts = [
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

const bestSellers = [
  {
    id: 1,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/best1.jpeg",
    link: "/",
  },
  {
    id: 2,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/best2.jpg",
    link: "/",
  },
  {
    id: 3,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/best3.jpg",
    link: "/",
  },
  {
    id: 4,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/best4.jpeg",
    link: "/",
  },
  {
    id: 5,
    name: "مانتو مدل هیوا",
    price: "1,949,000 تومان",
    image: "/best5.jpeg",
    link: "/",
  },
];

export default function NewProducts() {
  return (
    <section className="new-products-section">
      <h2 className="section-title">محصولات جدید</h2>
      <div className="product-list">
        {newProducts.map((product) => (
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
      <h2 className="section-title">پرفروش‌ترین‌ها</h2>
      <div className="product-list">
        {bestSellers.map((product) => (
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
    </section>
  );
}
