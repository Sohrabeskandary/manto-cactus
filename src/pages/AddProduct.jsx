import React from "react";
import Sidebar from "../components/Sidebar";
import ProductList from "./ProductList";

export default function AddProduct() {
  return (
    <div>
      <form action="submit">
        <label for="product-name" className="form-label">
          نام محصول
        </label>
        <input
          name="product-name"
          type="text"
          className="form-input"
          id="product-name"
          placeholder="مدل ..."
          value=""
          required=""
        />
        <label for="product-price" className="form-label">
          قیمت محصول
        </label>
        <input
          name="product-price"
          type="text"
          className="form-input"
          id="product-price"
          placeholder="مدل ..."
          value=""
          required=""
        />
        <label for="product-quantity" className="form-label">
          موجودی (تعداد)
        </label>
        <input
          name="product-quantity"
          type="text"
          className="form-input"
          id="product-quantity"
          placeholder="مدل ..."
          value=""
          required=""
        />
        <label for="product-slug" className="form-label">
          شناسه محصول
        </label>
        <input
          name="product-slug"
          type="text"
          className="form-input"
          id="product-slug"
          placeholder="مدل ..."
          value=""
          required=""
        />
        <label for="product-colors" className="form-label">
          رنگ‌های محصول
        </label>
        <input
          name="product-colors"
          type="text"
          className="form-input"
          id="product-colors"
          placeholder="مدل ..."
          value=""
          required=""
        />
        <label for="product-sizes" className="form-label">
          سایز‌های محصول
        </label>
        <input
          name="product-sizes"
          type="text"
          className="form-input"
          id="product-sizes"
          placeholder="مدل ..."
          value=""
          required=""
        />
      </form>
    </div>
  );
}
