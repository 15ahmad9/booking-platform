import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="/" className="brand">
          <div className="logo">BB</div>
          <span className="title">BeautyBooking</span>
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/providers">Providers</a>
          <a href="/booking">Booking</a>
          <a href="/contact">Contact Us</a>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
