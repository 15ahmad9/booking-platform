import React, { useState } from "react";
import contactService from "../services/contactService";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contactService.sendMessage(form);
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
