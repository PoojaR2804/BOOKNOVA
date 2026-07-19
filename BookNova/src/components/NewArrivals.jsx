import "../styles/NewArrivals.css";
import books from "../data/NewArrivals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookDetails from "./BookDetails";

function NewArrivals() {
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access");

  const handleViewDetails = (book) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          message: "🔒 Please login to view book details.",
        },
      });
      return;
    }

    setSelectedBook(book);
  };

  const handleReadOnline = (bookId) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          message: "🔒 Please login to read books.",
        },
      });
      return;
    }

    navigate(`/read/${bookId}`);
  };

  return (
    <section className="new-arrivals">
      <p className="section-tag">NEW ARRIVALS</p>

      <h2>Latest Releases</h2>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <div className="book-img">
              <img src={book.image} alt={book.title} />
            </div>

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <span>₹ {book.price}</span>

            <div className="new-buttons">
              <button onClick={() => handleViewDetails(book)}>
                View Details
              </button>

              <button onClick={() => handleReadOnline(book.id)}>
                Read Online
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookDetails
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
}

export default NewArrivals;