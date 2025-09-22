import React from "react";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-purple-900">Welcome to BeautyBook</h1>
        <p className="mt-4 text-gray-700">
          Book your barber, salon, spa, or beauty clinic easily and quickly.
        </p>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card title="Men's Barbershop" image="/img/barber.jpg" />
        <Card title="Women's Salon" image="/img/salon.jpg" highlight />
        <Card title="Beauty Clinics" image="/img/clinic.jpg" />
        <Card title="Turkish Bath" image="/img/hammam.jpg" />
      </section>

      {/* Special Feature */}
      <section className="mt-12 bg-purple-100 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-purple-900">Barber to Your Home</h2>
        <p className="mt-2 text-gray-700">Enjoy a professional haircut at your doorstep.</p>
      </section>
    </div>
  );
}
