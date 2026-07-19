import "../styles/Hero.css";

function Hero() {
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
          <a href="#books">
          <button className="primary-btn">
            Explore Books
          </button></a>
           <a href="#categories">
          <button className="secondary-btn">
            Categories
          </button>
          </a>
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
