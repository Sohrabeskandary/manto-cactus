import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import FooterSection from "./Footer.jsx";

// Import your page components
import HomePage from "./HomePage.jsx"; // The combination of your existing components
import AllProductsPage from "./AllProductsPage.jsx"; // The new page

function App() {
  return (
    // 1. BrowserRouter enables client-side routing
    <BrowserRouter>
      {/* Header and Footer are rendered on all pages */}
      <Header />

      {/* 2. Routes defines the area where page content changes */}
      <Routes>
        {/* Route for the Home Page (path is "/") */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the Products Page (path is "/products") */}
        <Route path="/products" element={<AllProductsPage />} />

        {/* Optional: Add other pages like /about, /contact, or a 404 route */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>

      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
