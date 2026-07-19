import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <h2>📚 BookNova</h2>
          <p>
            Discover, explore and buy your favourite books from thousands
            of collections. Your reading journey starts here.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#books">Books</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📧 support@booknova.com</p>
          <p>📞 +91 98765 43210</p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 BookNova. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;