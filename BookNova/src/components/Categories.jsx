import "../styles/Categories.css";

const categories = [
  "All",
  "Fiction",
  "Mystery",
  "Classic",
  "Science Fiction",
  "Adventure",
  "Horror",
];

function Categories({ setSelectedCategory }) {
  return (
    <section id="categories" className="categories">
      <p className="category-tag">CATEGORIES</p>

      <h2>Browse by Category</h2>

      <div className="category-list">
        {categories.map((category, index) => (
          <button
  key={index}
  onClick={() => setSelectedCategory(category)}
>
  {category}
</button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
