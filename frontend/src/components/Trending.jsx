import React from "react";
// استيراد عناصر Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// استيراد CSS الخاص بـ Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Trending = () => {
  const items = [
    { id: 1, name: "Top Haircut", img: "https://source.unsplash.com/600x400/?haircut" },
    { id: 2, name: "Nail Art", img: "https://source.unsplash.com/600x400/?nails" },
    { id: 3, name: "Facial Spa", img: "https://source.unsplash.com/600x400/?facial" },
    { id: 4, name: "Massage Therapy", img: "https://source.unsplash.com/600x400/?massage" },
    { id: 5, name: "Beard Styling", img: "https://source.unsplash.com/600x400/?beard" },
  ];

  return (
    <section className="trending container">
      <h2 className="text-center">🔥 Trending Now</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="trend-card">
              <img src={item.img} alt={item.name} />
              <div className="meta">
                <h3>{item.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Trending;
