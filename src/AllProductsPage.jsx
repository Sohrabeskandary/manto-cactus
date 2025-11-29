import React, { useEffect, useState } from "react";
import "./AllProductsPage.css";
import "./NewProducts.css";

export default function AllProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "مانتو مدل هیوا",
      price: "1,949,000 تومان",
      image: "/best1.jpeg",
      link: "/1",
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
  ]);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5173/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="hero-nav">
        <a href="/">صفحه اصلی</a>
        <p>/</p>
        <a href="/products" className="active">
          محصولات
        </a>
      </div>
      <div className="horizontal-container">
        <div className="sort">
          <div className="search-box">
            <input type="text" placeholder="جستجو..." />
            <img src="/search.svg" alt="search-icon" />
          </div>

          <div className="filter-container">
            <h3>دسته‌بندی محصولات</h3>
            <ul>
              <li>مانتو</li>
              <li>کت</li>
              <li>شومیز و پیراهن</li>
              <li>دامن و شلوار</li>
              <li>کت چند تکه</li>
              <li>فرم اداری</li>
              <li>کاپشن و پافر</li>
              <li>پالتو</li>
              <li>بارانی</li>
            </ul>

            <h3>سایز</h3>
            <ul>
              <li>فری سایز</li>
              <li>سایز 1</li>
              <li>سایز 2</li>
              <li>سایز 3</li>
            </ul>

            <h3>محدوده قیمت</h3>
            <input type="range" min="657000" max="2199000" />
          </div>
        </div>
        <div className="vertical-container">
          <div className="top-bar">
            <div className="horizontal mini-gap">
              <div className="horizontal">
                <img src="/sort.svg" alt="sort" />
                <p className="text">مرتب‌سازی:</p>
              </div>
              <div className="sort-top-bar">
                <a href="/newest">پربازدیدترین</a>
                <a href="/newest">جدیدترین</a>
                <a href="/bestseller">پرفروش‌ترین‌</a>
                <a href="/lowestprice">ارزان‌ترین</a>
                <a href="highestprice">گران‌ترین</a>
              </div>
            </div>

            <div className="horizontal">
              <p className="text">نمایش کالاهای موجود</p>
              <input type="checkbox" id="switch" />
              <label for="switch">Toggle</label>
            </div>
          </div>
          <div className="product-list-full-page">
            {products.map((product) => (
              <a
                href={`/products/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{product.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
