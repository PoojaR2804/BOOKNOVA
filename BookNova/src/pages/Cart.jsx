import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Footer from "../components/Footer";
import BookDetails from "../components/BookDetails";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await api.get("/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const openBookDetails = async (bookId) => {
    try {
      const { data } = await api.get(`/books/${bookId}/`);
      setSelectedBook(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem("access");

      await api.delete(`/cart/remove/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to remove item.");
    }
  };

  const proceedToCheckout = () => {
    localStorage.setItem("checkoutType", "cart");
    navigate("/checkout");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.book_price * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-container">
        <h1 className="cart-title">🛒 My Cart</h1>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-left">
                  <img
                    src={item.book_image}
                    alt={item.book_title}
                    className="cart-book-image"
                    style={{ cursor: "pointer" }}
                    onClick={() => openBookDetails(item.book)}
                  />

                  <div className="cart-details">
                    <h3
                      style={{ cursor: "pointer" }}
                      onClick={() => openBookDetails(item.book)}
                    >
                      {item.book_title}
                    </h3>

                    <p className="cart-price">
                      ₹ {item.book_price}
                    </p>

                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total Amount</h2>

              <p className="total-price">
                ₹ {totalPrice}
              </p>

              <button
                className="place-order-btn"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <BookDetails
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <Footer />
    </>
  );
}

export default Cart;