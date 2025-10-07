import cactusLogo from "/logo.svg";
import search from "/search.svg";
import profile from "/profile.svg";
import fav from "/fav.svg";
import cart from "/cart.svg";
import phone from "/phone.svg";
import instagram from "/instagram.svg";
import whatsapp from "/whatsapp.svg";

import "./styles.css";

function Header() {
  return (
    <header>
      <div>
        <a href="/">
          <img className="logo" src={cactusLogo} alt="cactus-logo" />
        </a>
      </div>
      <div className="main-nav">
        <a href="/">صفحه اصلی</a>
        <a href="/products">لیست محصولات</a>
        <a href="/about">درباره ما</a>
        <a href="/blog">وبلاگ</a>
      </div>
      <div className="icon-nav">
        <a href="/search">
          <img src={search} alt="search button" />
        </a>
        <a href="/profile">
          <img src={profile} alt="search button" />
        </a>
        <a href="/favorites">
          <img src={fav} alt="search button" />
        </a>
        <a href="/cart">
          <img src={cart} alt="search button" />
        </a>
      </div>
      <div className="social-icons">
        <a href="/instagram">
          <img src={instagram} alt="instagram" />
        </a>
        <a href="/whatsapp">
          <img src={whatsapp} alt="whatsapp" />
        </a>
        <a href="/phone">
          <img src={phone} alt="phone" />
        </a>
      </div>
    </header>
  );
}

export default Header;
