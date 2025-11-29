import React, { useEffect, useState } from "react";
import "./AllProductsPage.css";
import "./NewProducts.css";

export default function ProductPage() {
  return (
    <div>
      <div className="hero-nav">
        <a href="/">صفحه اصلی</a>
        <p>/</p>
        <a href="/products" className="active">
          محصولات
        </a>
        <p>/</p>
        <a href="/id">نام محصول</a>
      </div>
    </div>
  );
}
