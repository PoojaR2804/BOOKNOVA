import "../styles/Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const placeOrder = async () => {
    // Address validation
    if (address.trim() === "") {
      setMessage("❌ Please enter your delivery address.");
      setIsError(true);
      return;
    }

    // Phone validation
    if (phone.trim() === "") {
      setMessage("❌ Please enter your phone number.");
      setIsError(true);
      return;
    }

    // 10-digit phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      setIsError(true);
      return;
    }

    try {
      const token = localStorage.getItem("access");

      await api.post(
        "/orders/create/",
        {
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("🎉 Your order has been placed successfully!");
      setIsError(false);

      setTimeout(() => {
        navigate("/orders");
      }, 1500);

    } catch (err) {
      console.log(err.response?.data);

      setMessage("❌ Failed to place your order. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {message && (
        <div className={isError ? "message error" : "message success"}>
          {message}
        </div>
      )}

      <div className="checkout-form">
        <label>Delivery Address</label>

         <textarea
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Enter your address"
  required
/>

        <label>Phone Number</label>

          <input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Enter phone number"
  maxLength={10}
  required
/>

        <button onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;