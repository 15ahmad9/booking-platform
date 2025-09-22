function Reviews() {
  const reviews = [
    { id: 1, user: "John Doe", review: "Great product and fast delivery!" },
    { id: 2, user: "Jane Smith", review: "Amazing customer service." },
    { id: 3, user: "Mike Lee", review: "High quality and worth the price." },
  ];

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-5 text-purple-600">Customer Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
          >
            <p className="italic">"{r.review}"</p>
            <h4 className="font-bold mt-2">- {r.user}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
