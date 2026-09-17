import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const onListing = location.pathname === "/movies";

  return (
    <header className="navbar">
    <div className="navbar__inner">
    <div className="navbar__brand">
      <span className="navbar__brand-mark">🎬</span>
      <span>MovieExplorer</span>
    </div>
    <nav className="navbar__links">
          <Link to="/" className={location.pathname === "/" ? "is-active" : ""}>Home</Link>
          <a href="#about" className={location.hash === "#about" ? "is-active" : ""}>About</a>
          <a href="#contact" className={location.hash === "#contact" ? "is-active" : ""}>Contact Us</a>
    </nav>
<div className="navbar__actions">
     <Link to="/movies" className={`navbar__cta ${onListing ? "is-active" : ""}`}>Movies</Link>
    </div>
    </div>
      <div className="filmstrip" aria-hidden="true" />
    </header>
  );
}
