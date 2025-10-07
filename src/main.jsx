import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header.jsx";
import HeroCarousel from "./Hero.jsx";
import CategorySection from "./Categories.jsx";
import NewProductsSection from "./NewProducts.jsx";
import Badges from "./Badges.jsx";
import FooterSection from "./Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <HeroCarousel />
    <CategorySection />
    <NewProductsSection />
    <Badges />
    <FooterSection />
  </StrictMode>
);
