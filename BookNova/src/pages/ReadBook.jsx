import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ReadBook.css";

function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login", {
        state: {
          message: "🔒 Please login to read books.",
        },
      });
      return;
    }

    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}/`);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!book) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
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

          <h4>About the Author</h4>

          <p>{book.aboutAuthor}</p>

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
            <strong>Price:</strong> ₹{book.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {book.ratings}
          </p>
        </div>
      </div>

      <div className="reader-box">
        <h2>📖 Read Online</h2>

        <pre className="book-preview">
          {book.preview}
        </pre>

        <p className="preview-note">
          This is only a preview of the book. Click <b>View Full Book</b> to
          read online or <b>Download PDF</b> to save it for offline reading.
        </p>

       <div className="book-actions">
  <a
    href={book.viewLink}
    target="_blank"
    rel="noopener noreferrer"
    className="view-btn"
  >
    📖 View Full Book
  </a>

  <a
    href={book.downloadLink}
    download={`${book.title}.pdf`}
    className="download-btn"
  >
    ⬇ Download PDF
  </a>
</div>
      </div>
    </div>
  );
}

export default ReadBook;