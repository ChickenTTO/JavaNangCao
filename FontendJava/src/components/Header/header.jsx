import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <h1 onClick={() => navigate("/dashboard/menu")}>Nhóm 7</h1>
      </div>

      {/* Nav links */}
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Search bar */}
      <div className="header-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      {/* Auth buttons */}
      <div className="header-auth">
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn-signup" onClick={() => navigate("/sign-up")}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
