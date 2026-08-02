import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await api.get("/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="orders-container">
        <h1>📦 My Orders</h1>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="No Orders"
            />

            <h2>No Orders Yet</h2>

            <p>
              Looks like you haven't purchased any books yet.
              <br />
              Start exploring our collection!
            </p>

            <a href="/" className="shop-btn">
              Browse Books
            </a>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              {/* Header */}
              <div className="order-top">
                <div>
                  <p className="label">Order ID</p>
                  <h3>#{order.id}</h3>
                </div>

                <div>
                  <p className="label">Ordered On</p>
                  <h4>
                    {new Date(order.created_at).toLocaleDateString()}
                  </h4>
                </div>

                <div>
                  <p className="label">Payment</p>
                  <span className="paid-badge">
                    ✅ {order.payment_status}
                  </span>
                </div>
              </div>

              {/* Books */}
              <div className="books-section">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div className="book-card" key={index}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="book-image"
                      />

                      <div className="book-details">
                        <h2>{item.title}</h2>

                        <p>
                          <strong>Author:</strong> {item.author}
                        </p>

                        <p>
                          <strong>Category:</strong> {item.category}
                        </p>

                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                      </div>

                      <div className="book-price">
                        <h3>₹{item.price}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No books available.</p>
                )}
              </div>

              {/* Footer */}
              <div className="order-footer">
                <h2>Total Paid : ₹{order.total}</h2>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;