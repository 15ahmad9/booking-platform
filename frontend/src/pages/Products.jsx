function Products() {
  const products = [
    { id: 1, name: "Product 1", price: "$20" },
    { id: 2, name: "Product 2", price: "$30" },
    { id: 3, name: "Product 3", price: "$50" },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5 text-purple-600">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.price}</p>
            <button className="mt-3 bg-black text-gold p-2 rounded hover:bg-purple-700">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
