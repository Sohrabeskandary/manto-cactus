import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  const [size, setSize] = useState("");
  const [selectedColors, setSelectedColors] = useState({}); // نگه داشتن رنگ انتخابی برای هر سایز
  const [qty, setQty] = useState(1);

  /* product */
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  /* variants */
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}/variants`)
      .then((res) => res.json())
      .then((data) => {
        setVariants(data);
        if (data.length) setSize(data[0].size);
      })
      .catch(console.error);
  }, [id]);

  /* images */
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}/images`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        if (data.length) {
          setActiveImage(`http://localhost:5000/uploads/${data[0].filename}`);
        }
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p>در حال بارگذاری...</p>;

  const sizes = [...new Set(variants.map((v) => v.size))];

  const availableColors = variants.filter((v) => v.size === size);

  const selectedVariant = variants.find(
    (v) => v.size === size && v.color_hex === selectedColors[size]
  );

  const handleColorClick = (colorHex) => {
    setSelectedColors({ ...selectedColors, [size]: colorHex });
  };

  return (
    <div className="big-container">
      <div className="product-page">
        {/* گالری */}
        <div className="product-gallery">
          <img src={activeImage} className="main-image" alt="" />
          <div className="thumbs">
            {images.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:5000/uploads/${img.filename}`}
                onClick={() =>
                  setActiveImage(
                    `http://localhost:5000/uploads/${img.filename}`
                  )
                }
                alt=""
              />
            ))}
          </div>
        </div>

        {/* اطلاعات */}
        <div className="product-info">
          <h1 className="title">{product.title}</h1>

          {/* سایز */}
          <div className="block">
            <h3>سایز:</h3>
            <select
              className="size-option"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                // هنگام تغییر سایز، رنگ انتخابی فعلی را reset نکن
                if (!selectedColors[e.target.value]) {
                  setSelectedColors({
                    ...selectedColors,
                    [e.target.value]: "",
                  });
                }
              }}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* رنگ */}
          <div className="block">
            <h3>رنگ‌های موجود:</h3>
            <div className="colors">
              {availableColors.map((v) => (
                <button
                  key={v.id}
                  className={
                    selectedColors[size] === v.color_hex
                      ? "color-btn active"
                      : "color-btn"
                  }
                  style={{ backgroundColor: v.color_hex }}
                  onClick={() => handleColorClick(v.color_hex)}
                  title={v.color}
                  disabled={v.stock === 0}
                />
              ))}
            </div>
            {selectedVariant && (
              <p className="selected-color">
                رنگ انتخاب‌شده: {selectedVariant.color}
              </p>
            )}
          </div>

          {/* قیمت */}
          <p className="price">
            {(selectedVariant?.price || product.base_price).toLocaleString()}{" "}
            تومان
          </p>

          {/* موجودی */}
          {selectedVariant && (
            <p className="stock">موجودی: {selectedVariant.stock}</p>
          )}

          {/* تعداد */}
          <div className="qty-box">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button
              onClick={() =>
                selectedVariant &&
                qty < selectedVariant.stock &&
                setQty(qty + 1)
              }
            >
              +
            </button>
          </div>

          {/* افزودن به سبد */}
          <button
            className="add-to-cart"
            disabled={!selectedVariant || selectedVariant.stock === 0}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
