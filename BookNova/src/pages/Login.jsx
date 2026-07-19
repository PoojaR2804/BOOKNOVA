import "../styles/Login.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
      useEffect(() => {
  if (location.state?.message) {
    setMessage(location.state.message);
    setIsError(false);
  }
}, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", form.username);

      setMessage("✅ Login Successful!");
      setIsError(false);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setMessage("❌ Invalid username or password");
      setIsError(true);
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        {message && (
          <div className={isError ? "message error" : "message success"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;