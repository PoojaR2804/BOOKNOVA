import "../styles/Features.css";
import {
  FaBookOpen,
  FaHeart,
  FaTruck,
  FaStar,
  FaBook
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBook/>,
      title: "Huge Collection",
      desc: "Browse thousands of books from different genres."
    },
    {
       icon: <FaBookOpen />,
      title: "Read Online",
      desc: "Read previews and manage your reading progress."
    },
    {
      icon: <FaHeart />,
      title: "Wishlist",
      desc: "Save your favourite books and access them anytime."
    },
    {
     icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "Order books quickly with a smooth checkout experience."
    }
  ];

  return (
    <section id="features" className="features">
      <p className="feature-tag">WHY BOOKNOVA</p>

      <h2>Why Readers Love BookNova</h2>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Features;
