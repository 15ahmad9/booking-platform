import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div className="logo">BeautyBooking</div>
        <div className="center-links">
          <a href="/">Home</a>
          <a href="/providers">Providers</a>
          <a href="/booking">Booking</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="socials">
          <a href="https://facebook.com">Fb</a>
          <a href="https://instagram.com">Ig</a>
          <a href="https://twitter.com">Tw</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;