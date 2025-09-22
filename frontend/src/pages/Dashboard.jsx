import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">
        Welcome, {user?.name || "Guest"}
      </h2>
      <p className="text-gray-700">
        This is your dashboard. From here you can manage your bookings,
        profile, and settings.
      </p>
    </div>
  );
}
