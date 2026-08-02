import "../styles/Hero.css";

function Hero() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">

      <div className="hero-left">

        <p className="hero-tag">
          📚 YOUR DIGITAL LIBRARY
        </p>

        <h1>
          Discover Your <br />
          Next Favourite <span>Book</span>
        </h1>

        <p className="hero-desc">
          Explore thousands of books across every genre.
          Save favourites, build your personal library and
          enjoy reading anytime.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => scrollToSection("books")}
          >
            Explore Books
          </button>

          <button
            className="secondary-btn"
            onClick={() => scrollToSection("categories")}
          >
            Categories
          </button>

        </div>

      </div>

      <div className="hero-right">

        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700"
          alt="Books"
        />

      </div>

    </section>
  );
}

export default Hero;