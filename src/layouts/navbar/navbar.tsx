import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useAuth } from "../../hooks/auth/useAuth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const auth = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    auth.user ? true : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsUserLoggedIn(auth.user ? true : false);
  }, [auth]);

  const handleLogout = () => {
    auth.logout();
    setIsUserLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        Online Shop
      </NavLink>
      <ul>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shopping-cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Cart
          </NavLink>
        </li>
        {!isUserLoggedIn ? (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          </li>
        ) : (
          <div className="logout-container">
            <p>Hello, {auth.user?.username}</p>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
}
