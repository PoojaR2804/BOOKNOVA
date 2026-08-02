import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import Categories from "../components/Categories";
import Features from "../components/Features";
import NewArrivals from "../components/NewArrivals";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const section = document.getElementById(location.state.scrollTo);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }

        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />

      <div id="books">
        <BookCard />
      </div>

      <div id="categories">
        <Categories />
      </div>

      <Features />
      <NewArrivals />
    </>
  );
}

export default Home;