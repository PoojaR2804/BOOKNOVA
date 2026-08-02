import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/BookCard.css";
import BookDetails from "./BookDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

function BookCard({ selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBooks =
    selectedCategory === "All" || !selectedCategory
      ? books
      : books.filter(
          (book) => book.category === selectedCategory
        );

  const handleViewDetails = (book) => {
    const isLoggedIn = localStorage.getItem("access");

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
    const isLoggedIn = localStorage.getItem("access");

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
    <section id="books" className="books-section">
      <p className="section-tag">POPULAR BOOKS</p>

      <h2>Explore Our Collection</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={25}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {filteredBooks.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="book">
              <div className="book-img">
                <img
                  src={book.image}
                  alt={book.title}
                />
              </div>

              <h3>{book.title}</h3>

              <p>{book.author}</p>

              <span>₹ {book.price}</span>

              <div className="book-card-buttons">
                <button
                  onClick={() => handleViewDetails(book)}
                >
                  View
                  <br />
                  Details
                </button>

                <button
                  className="read-link"
                  onClick={() => handleReadOnline(book.id)}
                >
                  Read
                  <br />
                  Online
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <BookDetails
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <p
        style={{
          textAlign: "center",
          color: "#5F8D4E",
          marginTop: "20px",
          fontWeight: "600",
        }}
      >
        ← Swipe or use arrows to explore more books →
      </p>
    </section>
  );
}

export default BookCard;