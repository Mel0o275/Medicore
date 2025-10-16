import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
/* -------------------------- React --------------------------- */
import { useState, useEffect } from "react";
/* -------------------------- Constants --------------------------- */

import { categories } from "../../Constants/NavPages.jsx";
/* -------------------------- MUI --------------------------- */
import { Box , Card  , CardContent ,Typography ,  CardActionArea } from "@mui/material";


export default function CategoriesSwipper() {

  return (
    <Swiper
      spaceBetween={20}
      freeMode={true}
      pagination={{ clickable: true }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
      breakpoints={{
        320: { slidesPerView: 1.2 }, // موبايل صغير
        600: { slidesPerView: 2 }, // تابلت
        900: { slidesPerView: 3 }, // لابتوب صغير
        1200: { slidesPerView: 4 }, // شاشات كبيرة
      }}
      style={{padding:"3rem"}}
    >
      {categories.map((ele, i) => (
        <SwiperSlide key={i}>
          <Card
            sx={{
              height: 280, 
              position: "relative",
              transition: "all 0.3s ease-in-out",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                transform: "translateY(-4px)",
              },
              backgroundImage: `url(/images/catSwip-${i + 1}.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.30)",
              }}
            />

            <CardActionArea
              onClick={() => setSelectedCard(i)}
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                p: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                  }}
                >
                  {ele.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    opacity: 0.9,
                  }}
                >
                  {ele.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
