import "../styles/BookDetails.css";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useState, useEffect } from "react";

function BookDetails({ book, onClose }) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Clear message whenever a different book is opened
  useEffect(() => {
    setMessage("");
    setIsError(false);
  }, [book]);

  if (!book) return null;

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("access");

      await api.post(
        "/cart/add/",
        {
          book_id: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("🛒 Book added to your cart successfully!");
      setIsError(false);

    } catch (error) {
      console.log(error.response?.data || error);

      if (error.response?.status === 401) {
        setMessage("❌ Please login first.");
      } else if (error.response?.status === 404) {
        setMessage("❌ Cart API not found.");
      } else {
        setMessage("❌ Failed to add book to cart.");
      }

      setIsError(true);
    }
  };

  const buyNow = () => {
    setMessage("🎉 Your order has been placed successfully!");
    setIsError(false);
  };

  const handleClose = () => {
    setMessage("");
    setIsError(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>

        <div className="modal-content">

          <img src={book.image} alt={book.title} />

          <div className="details">

            <h2>{book.title}</h2>

            <h4>{book.author}</h4>

            <p className="price">₹ {book.price}</p>

            <p>
              <strong>Category:</strong> {book.category}
            </p>

            <p>
              <strong>Pages:</strong> {book.pages}
            </p>

            <p>
              <strong>Language:</strong> English
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {book.ratings}
            </p>

            <p>
              <strong>About the Author:</strong>
            </p>

            <p>{book.aboutAuthor}</p>

            {message && (
              <div className={isError ? "message error" : "message success"}>
                {message}
              </div>
            )}

            <div className="modal-buttons">

              <Link to={`/read/${book.id}`}>
                <button>📖 Read Online</button>
              </Link>

              <button onClick={buyNow}>
                💳 Buy Now
              </button>

              <button onClick={addToCart}>
                🛒 Add to Cart
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default BookDetails;