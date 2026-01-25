import { useRef } from "react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreenAnimation from "../../Animations/LoadingScreenAnimation";
import ProductCard from "../../Components/Products/ProductCard";
import useTheme from "../../Store/useTheme";

const fetchProducts = async () => {
  const url = import.meta.env.VITE_API_URL;
  const { data } = await axios.get(`${url}/products/best-seller`);
  return data;
};
const BestSeller = () => {
  const theme = useTheme();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: true,
  });
  const popularProducts = data?.data?.products;
  const swiperRef = useRef(null);
  if (isLoading) return <LoadingScreenAnimation />;

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
         
          boxShadow:5,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 8,
          height: 300,
        }}
      >
        <Stack spacing={2} sx={{ width: "100%", textAlign: "left" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Up To 50% Off
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            For Pressure Monitor
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,

              alignSelf: "flex-start",
              width: "fit-content",
              "&:hover": {
                backgroundColor:
                  theme.mode !== "dark"
                    ? theme.secondaryText
                    : theme.primaryColor,
              },
            }}
          >
            View More
          </Button>
        </Stack>

        <Box sx={{ width: "40%", textAlign: "center" }}>
          <img
            src="/Jolie/forpressuremonitor.jpg"
            alt="Pressure Monitor"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "400px",borderRadius:'5px' }}
          />
        </Box>
      </Box>

      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography
            variant="h3"
            sx={{
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            }}
            fontWeight="bold"
          >
            Popular Products
          </Typography>
        </Stack>

        {isError ? (
          <Box
            sx={{
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,

              p: 4,
              borderRadius: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <MdOutlineReportGmailerrorred
              style={{
                fontSize: 60,

                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              Failed to load products
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,

                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              We’re having trouble loading products. Please try again.
            </Typography>
          </Box>
        ) : (
          <>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop={false}
              style={{ paddingBottom: "20px" }}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {popularProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <IconButton
                onClick={() => swiperRef.current?.slidePrev()}
                sx={{
                  border: "1px solid #e0e0e0",
                  mr: 1,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => swiperRef.current?.slideNext()}
                sx={{
                  border: "1px solid #e0e0e0",
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default BestSeller;
