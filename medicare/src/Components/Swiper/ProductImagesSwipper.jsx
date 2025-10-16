import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function ProductImagesSwipper({ itemImages }) {
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Pagination]}
      className="mySwiper rounded-2xl shadow-lg overflow-hidden  bg-gray-50"
    >
      {itemImages.map((img, i) => (
        <SwiperSlide
          key={i}
          className="flex justify-center items-center bg-gray-50"
        >
          <img
            src={img}
            alt={`product-${i}`}
            className="w-full h-full object-contain "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
