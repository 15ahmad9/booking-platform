import React from "react";

const Categories = () => {
  const categories = [
    { id: 1, name: "Men’s Barbers", img: "https://source.unsplash.com/400x300/?barber" },
    { id: 2, name: "Women’s Salon", img: "https://source.unsplash.com/400x300/?hair-salon", featured: true },
    { id: 3, name: "Beauty Clinics", img: "https://source.unsplash.com/400x300/?clinic" },
    { id: 4, name: "Turkish Bath", img: "https://source.unsplash.com/400x300/?spa" },
  ];

  return (
    <section className="container">
      <h2 className="text-center">Choose Your Category</h2>
      <div className="categories-grid">
        {categories.map(cat => (
          <div
            key={cat.id}
            className={`category-card ${cat.featured ? "featured" : ""}`}
          >
            <img src={cat.img} alt={cat.name} />
            <div className="meta">
              <h3>{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
