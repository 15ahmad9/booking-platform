import React, { useState, useEffect } from "react";
import bookingService from "../services/bookingService";
import providerService from "../services/providerService";

export default function Booking() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function fetchProviders() {
      const data = await providerService.getProviders();
      setProviders(data);
    }
    fetchProviders();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    await bookingService.createBooking({
      providerId: selectedProvider,
      date,
      time,
    });
    alert("Booking confirmed!");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Book a Service</h2>
      <form onSubmit={handleBooking} className="bg-white p-6 shadow rounded">
        <label className="block mb-2">Choose Provider</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        >
          <option value="">Select...</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <label className="block mb-2">Select Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label className="block mb-2">Select Time</label>
        <input
          type="time"
          className="w-full border p-2 rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
