import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ReviewOrder.css";

function ReviewOrder() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const checkout = JSON.parse(localStorage.getItem("checkout"));
  const buyNowBook = JSON.parse(localStorage.getItem("buyNowBook"));

  useEffect(() => {
    const fetchData = async () => {
      // BUY NOW FLOW
      if (buyNowBook) {
        setItems([
          {
            id: buyNowBook.id,
            book_title: buyNowBook.title,
            book_price: buyNowBook.price,
            book_image: buyNowBook.image,
            quantity: 1,
          },
        ]);
        return;
      }

      // CART FLOW
      try {
        const token = localStorage.getItem("access");

        const res = await api.get("/cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.book_price * item.quantity,
    0
  );

  return (
    <div className="review-container">
      <h1>Review Your Order</h1>

      <div className="review-card">
        <h2>Books</h2>

        {items.map((item) => (
          <div key={item.id} className="review-item">
            <img
              src={item.book_image}
              alt={item.book_title}
            />

            <div>
              <h3>{item.book_title}</h3>
              <p>₹ {item.book_price}</p>
              <p>Qty : {item.quantity}</p>
            </div>
          </div>
        ))}

        <hr />

        <div className="delivery-box">
  <h2>📍 Delivery Details</h2>

  <div className="delivery-info">
    <div className="info-row">
      <span className="label">Address</span>
      <span className="value">{checkout?.address}</span>
    </div>

    <div className="info-row">
      <span className="label">Phone</span>
      <span className="value">{checkout?.phone}</span>
    </div>
  </div>
</div>

<hr />
        <h2>Total : ₹ {total}</h2>

        <div className="review-buttons">
          <button onClick={() => navigate("/checkout")}>
            Back
          </button>
             <button
  onClick={() => {
    localStorage.setItem("totalAmount", total);
    navigate("/payment");
  }}
>
  Proceed to Payment
</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewOrder;