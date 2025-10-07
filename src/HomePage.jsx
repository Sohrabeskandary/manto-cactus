import HeroCarousel from "./Hero.jsx";
import CategorySection from "./Categories.jsx";
import NewProductsSection from "./NewProducts.jsx";
import Badges from "./Badges.jsx";

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategorySection />
      <NewProductsSection />
      <Badges />
    </>
  );
}

export default HomePage;
