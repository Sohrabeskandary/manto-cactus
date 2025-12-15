import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import FooterSection from "./Footer.jsx";

import HomePage from "./HomePage.jsx";
import AllProductsPage from "./AllProductsPage.jsx";
import ProductPage from "./ProductPage.jsx";
import AdminPage from "./AdminPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<AllProductsPage />} />

        <Route path="/products/:id" element={<ProductPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>

      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
