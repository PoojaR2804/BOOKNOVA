import "../styles/Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const placeOrder = () => {

    if (address.trim() === "") {
      setMessage("❌ Please enter your delivery address.");
      setIsError(true);
      return;
    }

    if (phone.trim() === "") {
      setMessage("❌ Please enter your phone number.");
      setIsError(true);
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      setIsError(true);
      return;
    }

    // Save checkout details
    localStorage.setItem(
      "checkout",
      JSON.stringify({
        address,
        phone,
      })
    );

    // Check whether user came from Cart or Buy Now
    const checkoutType = localStorage.getItem("checkoutType");

    // Only remove Buy Now data for Cart flow
    if (checkoutType === "cart") {
      localStorage.removeItem("buyNowBook");
    }

    navigate("/review");
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
          Proceed to Review
        </button>
      </div>
    </div>
  );
}

export default Checkout;