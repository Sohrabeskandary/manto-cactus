import { useEffect, useState } from "react";
import "./Hero.css";

const slidesData = [
  {
    image: "/hero.png",
    title: "سادگی شیک، امضای کاکتوس",
    buttonText: "خرید",
    buttonLink: "#services",
  },
  {
    image: "/hero1.png",
    title: "کالکشن پاییزه",
    // text: "سفر به طبیعت با راهنمایان محلی",
    buttonText: "خرید",
    buttonLink: "#tours",
  },
  {
    image: "/hero2.png",
    title: "خرید غیرحضوری و حضوری",
    // text: "از سفر خود لذت ببرید",
    buttonText: "خرید",
    buttonLink: "#contact",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalTime = 5000; // زمان بین اسلایدها (میلی‌ثانیه)
  let slideInterval;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  useEffect(() => {
    slideInterval = setInterval(nextSlide, intervalTime);
    return () => clearInterval(slideInterval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
    clearInterval(slideInterval);
  };

  return (
    <div className="hero-carousel">
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay"></div>
          <div className="content">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <a href={slide.buttonLink} className="btn">
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      <button className="nav prev" onClick={nextSlide}>
        <img src="/prev.svg" alt="" />
      </button>
      <button className="nav next" onClick={prevSlide}>
        <img src="/next.svg" alt="" />
      </button>

      <div className="dots">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={index === current ? "active" : ""}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
