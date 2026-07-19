import "../styles/Navbar.css";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access");
  const username = localStorage.getItem("username");
const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");

  navigate("/login", {
    state: {
      message: "✅ Logged out successfully!"
    }
  });
};

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">
          <FaBook />
        </span>
        <span className="logo-text">BookNova</span>
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="#books">Books</a></li>
        <li><a href="#categories">Categories</a></li>
        <Link to="/cart">
  🛒 Cart
</Link>

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
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
        )}
      </ul>
    </nav>
  );
}

export default Navbar;