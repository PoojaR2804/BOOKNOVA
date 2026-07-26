import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookCard from "./components/BookCard";
import Categories from "./components/Categories";
import Features from "./components/Features";
import NewArrivals from "./components/NewArrivals";
import Footer from "./components/Footer";
import ReadBook from "./pages/ReadBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import ReviewOrder from "./pages/ReviewOrder";
import "./styles/App.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Hero />
      <Categories setSelectedCategory={setSelectedCategory} />
      <BookCard selectedCategory={selectedCategory} />
      <Features />
      <NewArrivals />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

       <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/read/:id" element={<ReadBook />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route 
 path="/cart" 
 element={<Cart />} 
/>
<Route path="/checkout" element={<Checkout />} />
<Route path="/payment" element={<Payment />} />
<Route path="/orders" element={<Orders />} />
<Route path="/review" element={<ReviewOrder />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;