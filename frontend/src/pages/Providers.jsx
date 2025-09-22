import React, { useEffect, useState } from "react";
import providerService from "../services/providerService";
import Card from "../components/Card";

export default function Providers() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const data = await providerService.getProviders();
      setProviders(data);
    }
    loadProviders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Our Providers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((p) => (
          <Card key={p.id} title={p.name} image="/img/salon.jpg" />
        ))}
      </div>
    </div>
  );
}
