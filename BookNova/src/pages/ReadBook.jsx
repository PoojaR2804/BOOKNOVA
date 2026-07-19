import { useParams, Link, useNavigate } from "react-router-dom";
import books from "../data/books";
import newArrivals from "../data/NewArrivals";
import "../styles/ReadBook.css";
import { useEffect } from "react";

function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login", {
        state: {
          message: "🔒 Please login to read books.",
        },
      });
    }
  }, [navigate]);

  const allBooks = [...books, ...newArrivals];
  const book = allBooks.find((b) => b.id === Number(id));

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="reader-page">
      <div className="reader-header">
        <Link to="/" className="back-btn">
          ← Back to Library
        </Link>
      </div>

      <div className="book-info">
        <img
          src={book.image}
          alt={book.title}
          className="book-cover"
        />

        <div className="book-details">
          <h1>{book.title}</h1>
          <h3>Author: {book.author}</h3>

          <h4>About the Author:</h4>
          <p>{book.aboutAuthor}</p>

          <p>
            <strong>Category:</strong> {book.category}
          </p>

          <p>
            <strong>Pages:</strong> {book.Pages}
          </p>

          <p>
            <strong>Language:</strong> English
          </p>

          <p>
            <strong>Price:</strong> ₹{book.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {book.Ratings || "N/A"}
          </p>
        </div>
      </div>

      <div className="reader-box">
        <h2>📖 Read Online</h2>

        <pre className="book-preview">
          {book.preview}
        </pre>

        <p className="preview-note">
          This is a preview of the book. Download the PDF to read the complete version.
        </p>

        <a href={book.pdf} download className="download-btn">
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default ReadBook;