import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import ProductList from "./ProductList";

function ProductStep({ product, setProduct, setVariants, setEditingId, next }) {
  const categories = [
    { id: 1, name: "مانتو" },
    { id: 2, name: "شومیز" },
    { id: 3, name: "پالتو" },
    { id: 4, name: "کاپشن" },
  ];

  const isValid =
    product.title && product.category_id && product.base_price > 0;

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (p) => {
    setProduct({
      title: p.title,
      description: p.description,
      category_id: p.category_id,
      base_price: Number(p.base_price),
    });

    setVariants(
      p.variants.map((v) => ({
        size: v.size,
        color: v.color,
        color_hex: v.color_hex || "#000000",
        price: Number(v.price),
        stock: v.stock,
      }))
    );

    setEditingId(p.id);
    next();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("حذف شود؟")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div>
      <div className="form-container">
        <h2>اطلاعات محصول</h2>

        <input
          className="form-input"
          placeholder="نام محصول"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />

        <select
          className="form-input"
          value={product.category_id}
          onChange={(e) =>
            setProduct({
              ...product,
              category_id: Number(e.target.value),
            })
          }
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          className="form-input"
          type="number"
          placeholder="قیمت پایه"
          value={product.base_price}
          onChange={(e) =>
            setProduct({
              ...product,
              base_price: Number(e.target.value),
            })
          }
        />

        <textarea
          className="form-textbox"
          placeholder="توضیحات"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <button disabled={!isValid} onClick={next} className="form-button">
          مرحله بعد
        </button>
      </div>
      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

function VariantRow({ variant, index, update, remove }) {
  return (
    <div className="variant-container">
      <input
        className="variant-input"
        placeholder="سایز"
        value={variant.size}
        onChange={(e) => update(index, "size", e.target.value)}
      />

      <input
        className="variant-input"
        placeholder="نام رنگ (مثلاً زیتونی)"
        value={variant.color}
        onChange={(e) => update(index, "color", e.target.value)}
      />

      <input
        type="color"
        className="variant-color-picker"
        value={variant.color_hex}
        onChange={(e) => update(index, "color_hex", e.target.value)}
        title="انتخاب رنگ"
      />

      <input
        className="variant-input"
        type="number"
        placeholder="قیمت"
        value={variant.price}
        onChange={(e) => update(index, "price", Number(e.target.value))}
      />

      <input
        className="variant-input"
        type="number"
        placeholder="موجودی"
        value={variant.stock}
        onChange={(e) => update(index, "stock", Number(e.target.value))}
      />

      <button className="remove-variant" onClick={() => remove(index)}>
        ❌
      </button>
    </div>
  );
}

function ImageUploader({ images, setImages }) {
  const handleSelect = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      alert("حداکثر ۱۰ تصویر مجاز است");
      return;
    }

    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      <h3>گالری تصاویر</h3>

      <input type="file" accept="image/*" multiple onChange={handleSelect} />

      <div className="image-preview">
        {images.map((img, i) => (
          <div key={i} className="preview-item">
            <img src={URL.createObjectURL(img)} alt="" />
            <button onClick={() => removeImage(i)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VariantStep({
  product,
  variants,
  setVariants,
  images,
  setImages,
  back,
  submit,
}) {
  const updateVariant = (index, field, value) => {
    const copy = [...variants];
    copy[index][field] = value;
    setVariants(copy);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        size: "فری سایز",
        color: "",
        color_hex: "#000000",
        price: product.base_price,
        stock: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="variants">
      <h2>واریانت‌ها</h2>

      {variants.map((v, i) => (
        <VariantRow
          key={i}
          variant={v}
          index={i}
          update={updateVariant}
          remove={removeVariant}
        />
      ))}

      <button className="add-variant" onClick={addVariant}>
        ➕ افزودن واریانت
      </button>
      <ImageUploader images={images} setImages={setImages} />

      <div className="register-container">
        <button className="next-previous" onClick={back}>
          قبلی
        </button>
        <button className="register" onClick={submit}>
          ثبت محصول
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [step, setStep] = useState(1);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category_id: "",
    base_price: "",
  });

  const [variants, setVariants] = useState([
    {
      size: "فری سایز",
      color: "",
      color_hex: "#000000",
      price: "",
      stock: "",
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  const [images, setImages] = useState([]);

  const submitAll = async () => {
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    const method = editingId ? "PUT" : "POST";

    const formData = new FormData();

    formData.append("product", JSON.stringify(product));
    formData.append("variants", JSON.stringify(variants));

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "خطا در ثبت");
        return;
      }

      alert(editingId ? "محصول ویرایش شد ✅" : "محصول ثبت شد ✅");

      setProduct({
        title: "",
        description: "",
        category_id: "",
        base_price: "",
      });

      setVariants([
        {
          size: "فری سایز",
          color: "",
          color_hex: "#000000",
          price: "",
          stock: "",
        },
      ]);

      setImages([]);

      setEditingId(null);
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("خطا در ارتباط با سرور");
    }
  };

  return (
    <>
      {step === 1 && (
        <ProductStep
          product={product}
          setProduct={setProduct}
          setVariants={setVariants}
          setEditingId={setEditingId}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <VariantStep
          product={product}
          variants={variants}
          setVariants={setVariants}
          images={images}
          setImages={setImages}
          back={() => setStep(1)}
          submit={submitAll}
        />
      )}
    </>
  );
}
