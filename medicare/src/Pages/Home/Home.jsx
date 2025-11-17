/* -------------------------- React --------------------------- */
import { useState, useEffect } from "react";

/* -------------------------- MUI --------------------------- */
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Avatar,
} from "@mui/material";

/* -------------------------- Motion --------------------------- */

import { motion, AnimatePresence } from "motion/react";
/* -------------------------- Constants --------------------------- */

import { shapes, reviews, banners } from "../../Constants/NavPages";
/* -------------------------- Components --------------------------- */

import CategoriesSwipper from "../../Components/Swiper/CatagoriesSwiper";

import Footer from "../../Components/Footer/Footer";
import ProductsSwipper from "../../Components/Swiper/ProductsSwipper";
import ProductsDiscount from "../../Components/ProductsDiscount";

/* -------------------------- Icons --------------------------- */
/* -------------------------- Toast --------------------------- */

import MotionDiv from "../../Animations/HomeAnimation";




export default function Home() {
  const [index, setIndex] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container sx={{ p: 2 }}>
        {/* --------------------- Section one ------------------- */}
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionDiv
                img={shapes.shape1.imgs[index]}
                mainText={shapes.shape1.texts[index]}
                secondText={"Discover our pharmacy vitamins"}
                buttonText={"Shop Now"}
                duration={0.3}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} container spacing={2}>
              <Grid size={12}>
                <MotionDiv
                  img={shapes.shape2.imgs[index]}
                  mainText={shapes.shape2.texts[index]}
                  secondText={"Boost your daily energy"}
                  buttonText={"Get Started"}
                  duration={0.6}
                />
              </Grid>

              <Grid size={12} container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <MotionDiv
                    img={shapes.shape3.imgs[index]}
                    mainText={shapes.shape3.texts[index]}
                    secondText={"Exclusive offers just for you"}
                    buttonText={"View Offers"}
                    duration={0.9}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <MotionDiv
                    img={shapes.shape4.imgs[index]}
                    mainText={shapes.shape4.texts[index]}
                    secondText={"Natural care for better health"}
                    buttonText={"Learn More"}
                    duration={1.2}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* --------------------- Section two ------------------- */}

      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('/images/banner-home.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: { xs: 2, sm: 6, md: 10 },
          color: "white",
          borderRadius: "2xl",
        }}
      >
        <Box
          sx={{
            textAlign: { xs: "center", md: "right" },
            maxWidth: { xs: "100%", md: "45%" },
            backdropFilter: "blur(4px)",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            textAlign: "start",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Non-Woven Disposable Face Masks
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 3, color: "rgba(255,255,255,0.9)" }}
          >
            Starting At Only <strong>$59.00</strong>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      <Container sx={{ p: 2 }}>
        {/* --------------------- Section three ------------------- */}
        <Box>
          <CategoriesSwipper />
        </Box>

        {/* --------------------- Section three ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Grid
            container
            spacing={4}
            sx={{ textAlign: "center", textTransform: "capitalize" }}
          >
            <Grid size={12}>
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
              >
                Trusted by our customers
              </Typography>
            </Grid>

            {[
              {
                logo: "/images/brand-logo-2.png",
                review:
                  "Excellent pharmacy service! Always deliver my medications on time.",
              },
              {
                logo: "/images/brand-logo-1.png",
                review:
                  "Very professional staff. I trust them with all my health needs.",
              },
              {
                logo: "/images/brand-logo-3.png",
                review:
                  "Affordable prices and genuine products. Highly recommended!",
              },
            ].map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4 }}>
                <div className="bg-white rounded-2xl  p-6 flex flex-col items-center ">
                  <img
                    src={item.logo}
                    alt="brand"
                    className="w-20 h-20 mb-4 object-contain"
                  />
                  <Typography
                    variant="p"
                    className="text-gray-600 text-sm italic leading-relaxed"
                  >
                    "{item.review}"
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* --------------------- Section four ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h1"
            className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 "
            sx={{ marginBottom: "2rem" }}
          >
            Best Selling Products
          </Typography>
          <ProductsSwipper />
        </Box>

        {/* --------------------- Section Five ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Grid container spacing={3}>
            {/* ------------------ Left Banner ------------------ */}
            <Grid
              size={{ xs: 12, md: 8 }}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                height: "100%",
                width: "100%",
              }}
            >
              <div className="relative w-full h-80 overflow-hidden rounded-xl group shadow-lg flex flex-col justify-center items-center">
                {/* Image */}
                <img
                  src={`/images/CMS-banner-04.png`}
                  alt={`Banner 4`}
                  className="w-full transform transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/10 ">
                  <Typography
                    variant="h5"
                    className="text-white font-bold mb-3"
                  >
                    Your Trusted Online Pharmacy
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white/90 mb-5 px-3"
                  >
                    Explore top-quality medicines, health essentials, and
                    wellness products.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="px-6 py-2 rounded-full font-semibold"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Grid>

            {/* ------------------ Right Banner ------------------ */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                height: "100%",
                width: "100%",
              }}
            >
              <div className="relative w-full h-80 overflow-hidden rounded-xl group shadow-lg flex flex-col justify-center items-center">
                {/* Image */}
                <img
                  src={`/images/CMS-banner-05.png`}
                  alt={`Banner 5`}
                  className="w-full transform transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/10 ">
                  <Typography
                    variant="h5"
                    className="text-white font-bold mb-3"
                  >
                    Health & Beauty Essentials
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white/90 mb-5 px-3"
                  >
                    Discover skincare, supplements, and personal care items at
                    great prices.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="px-6 py-2 rounded-full font-semibold"
                  >
                    Explore More
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>

        {/* --------------------- Section Six ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h1"
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800  "
            sx={{ marginBottom: "2rem" }}
          >
            Dont Miss our dicounts !
          </Typography>
          <ProductsDiscount />
        </Box>

        {/* --------------------- Section Seven ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Grid container spacing={3}>
            {banners.map((item, i) => {
              return (
                <Grid
                  size={{ xs: 12, md: 4 }}
                  key={i}
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div className="relative w-full h-80 overflow-hidden rounded-xl group shadow-lg flex flex-col justify-center items-center">
                    {/* Image */}
                    <img
                      src={`/images/CMS-banner-0${i + 1}.png`}
                      alt={`Banner ${i + 1}`}
                      className="w-full  transform transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center   ">
                      <Typography
                        variant="body1"
                        className="text-black text-xl font-semibold mb-3 text-center px-3"
                      >
                        {item.text}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="  px-5 py-2 rounded-full font-medium  transition"
                      >
                        {item.btn}
                      </Button>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* --------------------- Section Eight ------------------- */}

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h1"
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800  "
          >
            Trusted by our Customers
          </Typography>

          <Grid container spacing={3}>
            {reviews.map((item) => (
              <Grid size={{ md: 4, xs: 12 }} key={item.id}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="h-60"
                >
                  {/* Rating */}
                  <Rating value={item.rating} readOnly />

                  {/* Review text */}
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#555",
                      marginTop: "10px",
                    }}
                  >
                    "{item.review}"
                  </p>

                  {/* Avatar + Name */}
                  <Avatar
                    alt={item.name}
                    src={item.avatar}
                    sx={{ width: 56, height: 56, margin: "15px auto 5px" }}
                  />
                  <p style={{ fontWeight: "600", margin: 0 }}>{item.name}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* --------------------- Section Nine ------------------- */}

        <Box sx={{ mt: 10 }}>
          <Grid container spacing={3}>
            {[
              {
                icon: "/images/service-icon-1.svg",
                title: "Free Delivery",
                desc: "Free delivery on prescriptions and orders above 500 EGP",
              },
              {
                icon: "/images/service-icon-2.svg",
                title: "Easy Returns",
                desc: "Return or exchange within 7 days for pharmacy products",
              },
              {
                icon: "/images/service-icon-3.svg",
                title: "Pharmacist Support",
                desc: "Consult our licensed pharmacists 24/7",
              },
              {
                icon: "/images/service-icon-4.svg",
                title: "Secure Payment",
                desc: "Pay safely via cards, wallets, or cash on delivery",
              },
            ].map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl  ">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 mb-4"
                  />
                  <Typography
                    variant="h5"
                    className="text-lg font-semibold text-gray-800 mb-2"
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="p" className="text-sm text-gray-500">
                    {item.desc}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
