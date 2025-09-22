import React from "react";

const Hero = () => {
  return (
    <section className="hero container">
      <div className="hero-card">
        <div>
          <h1>Book Your Beauty Appointment Easily</h1>
          <p>
            Discover the best salons, barbers, and beauty clinics near you.
            Reserve your spot in just a few clicks.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
        <img
          src="https://source.unsplash.com/600x400/?salon,beauty"
          alt="Salon"
          className="hero-img"
        />
      </div>
    </section>
  );
};

export default Hero;
