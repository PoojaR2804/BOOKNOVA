import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Payment.css";

function Payment() {
  const token = localStorage.getItem("access");

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [total, setTotal] = useState(0);

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      setErrorMessage("Failed to load Razorpay.");
    };

    document.body.appendChild(script);
  }, []);

  // Load Total
  useEffect(() => {
    const checkoutType = localStorage.getItem("checkoutType");

    if (checkoutType === "buyNow") {
      const book = JSON.parse(localStorage.getItem("buyNowBook"));

      if (book) {
        setTotal(Number(book.price));
      }
      return;
    }

    if (checkoutType === "cart") {
      fetchCartTotal();
    }
  }, []);

  const fetchCartTotal = async () => {
    try {
      const { data } = await api.get("/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const amount = data.reduce(
        (sum, item) => sum + Number(item.book_price) * item.quantity,
        0
      );

      setTotal(amount);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    setErrorMessage("");

    if (!razorpayLoaded) {
      setErrorMessage("Razorpay not loaded.");
      return;
    }

    try {
      const checkoutType = localStorage.getItem("checkoutType");

      let payload = {};

      if (checkoutType === "buyNow") {
        const book = JSON.parse(localStorage.getItem("buyNowBook"));

        payload = {
          checkoutType: "buyNow",
          book_id: book.id,
        };
      } else {
        payload = {
          checkoutType: "cart",
        };
      }

      const { data } = await api.post(
        "/orders/create-payment/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "BookNova",
        description: "Book Purchase",
        order_id: data.id,

        handler: async function (response) {
          try {
            const checkout = JSON.parse(
              localStorage.getItem("checkout")
            );

            const checkoutType =
              localStorage.getItem("checkoutType");

            let savePayload = {
              checkoutType,
              payment_id: response.razorpay_payment_id,
              address: checkout?.address,
              phone: checkout?.phone,
            };

            if (checkoutType === "buyNow") {
              const book = JSON.parse(
                localStorage.getItem("buyNowBook")
              );

              savePayload.book_id = book.id;
            }

            await api.post(
              "/orders/save-order/",
              savePayload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            localStorage.removeItem("checkout");
            localStorage.removeItem("checkoutType");
            localStorage.removeItem("buyNowBook");

            window.location.href = "/orders";

          } catch (err) {
            console.log(err);
            setErrorMessage("Failed to save order.");
          }
        },

        theme: {
          color: "#5fb139",
        },
      };

      const payment = new window.Razorpay(options);

      payment.on("payment.failed", function (response) {
        setErrorMessage(response.error.description);
      });

      payment.open();

    } catch (err) {
      console.log(err);

      setErrorMessage(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Payment Failed"
      );
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>🔒 Secure Payment</h1>

        <p className="payment-text">
          Complete your purchase securely using Razorpay.
        </p>

        <div className="amount-box">
          <h3>Order Summary</h3>

          <div className="amount-row">
            <span>Items Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          <div className="amount-row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>

          <div className="amount-row">
            <span>Tax</span>
            <span>₹ 0.00</span>
          </div>

          <hr />

          <div className="amount-row total">
            <span>Total Amount</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>

          {["UPI", "Card", "Net Banking", "Wallet"].map((method) => (
            <label key={method} className="method">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>

        {errorMessage && (
          <p className="payment-error">
            ❌ {errorMessage}
          </p>
        )}

        <p className="secure-note">
          🔒 Your payment is encrypted and secured by Razorpay.
        </p>

        <button
          className="pay-btn"
          onClick={handlePayment}
        >
          Pay ₹ {total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default Payment;