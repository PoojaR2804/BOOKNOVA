import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const access = localStorage.getItem("access");
    const user = localStorage.getItem("username");

    setIsLoggedIn(!!access);
    setUsername(user || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");

    navigate("/login", {
      state: {
        message: "✅ Logged out successfully!",
      },
    });
  };

  const goToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/", {
        state: {
          scrollTo: sectionId,
        },
      });
    } else {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">
          <FaBook />
        </span>

        <span className="logo-text">
          BookNova
        </span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <button
            className="nav-link-btn"
            onClick={() => goToSection("books")}
          >
            Books
          </button>
        </li>

        <li>
          <button
            className="nav-link-btn"
            onClick={() => goToSection("categories")}
          >
            Categories
          </button>
        </li>

        <li>
          <Link to="/cart">
            🛒 Cart
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/orders">
                Orders
              </Link>
            </li>

            <li className="welcome-user">
              👤 Welcome, {username}
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;