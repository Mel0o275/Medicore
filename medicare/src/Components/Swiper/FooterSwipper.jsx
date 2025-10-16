import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function FooterSwipper() {
  return (
    <Swiper
      modules={[FreeMode, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      slidesPerView={4}
      spaceBetween={30} // Add space between slides
      autoplay={{
        delay: 200,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      freeMode={true}
      speed={1000}
      style={{ height: "100%" }} // Ensure Swiper has height
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <SwiperSlide key={num}>
          <img
            src={`/images/social-image-${num}.jpg`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Prevent image distortion
            }}
            alt={`Social Image ${num}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
