import React, { useRef } from 'react';
import { Container, Box, Typography, Button, Rating, Card, CardContent, CardMedia, Stack, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PRIMARY_COLOR = '#00a297';

const popularProducts = [
  { id: 1, 
     name: "Himalaya Baby Body Lotion",
     imageUrl: '../../../public/Jolie/blisswelness.jpg',
     rating: 5,
     oldPrice: 9.20, 
     newPrice: 8 },

  { id: 2, 
    name: "MCaffeine Deep Moisturisation", 
    imageUrl: '../../../public/Jolie/caffeine.jpg', 
    rating: 5, 
    oldPrice: 10.50, 
    newPrice: 9 },

  { id: 3, 
    name: "Liveasy Diabetic Protein", 
    imageUrl: '../../../public/Jolie/liveasy.jpg', 
    rating: 4, 
    oldPrice: 5, 
    newPrice: 4.50 },

  { id: 4, 
    name: "Lumbar Sacro Support Belt", 
    imageUrl: '../../../public/Jolie/lumbarsacrosupportbelt.jpg', 
    rating: 4, 
    oldPrice: 20, 
    newPrice: 18 },

  { id: 5, 
    name: "Himalaya Baby Body Lotion", 
    imageUrl: '../../../public/Jolie/himalaya.jpg', 
    rating: 5, 
    oldPrice: 9.20, 
    newPrice: 8 },

  { id: 6, 
    name: "Newnik Fingertip Pulse Oximeter with Audio", 
    imageUrl: '../../../public/Jolie/newnik.jpg', 
    rating: 4, 
    oldPrice: 19, 
    newPrice: 17 },

  { id: 7, 
    name: "Vicks VapoRub Cold & Cough Relief Balm ", 
    imageUrl: '../../../public/Jolie/vapoRub.jpg', 
    rating: 5, 
    newPrice: 1.30 },
];

const ProductCard = ({ product }) => (
  <Card
    sx={{
      width: '100%',
      p: 1,
      borderRadius: 2,
      position: 'relative',
      boxShadow: 2,
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
      '&:hover .add-to-cart': {
        opacity: 1,
        bottom: 10,
      },
    }}
  >
    <CardMedia
      component="img"
      height="180"
      image={product.imageUrl}
      alt={product.name}
      sx={{ objectFit: 'contain', pt: 1 }}
    />

    <Button
      variant="contained"
      className="add-to-cart"
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: -30,
        bgcolor: PRIMARY_COLOR,
        color: '#fff',
        textTransform: 'none',
        fontSize: '0.8rem',
        opacity: 0,
        transition: 'all 0.3s ease',
        '&:hover': { bgcolor: '#00a297' },
      }}
    >
      Add to Cart
    </Button>

    <CardContent sx={{ pb: 1, textAlign: 'left' }}>
      <Typography variant="body1" sx={{ mt: 1, mb: 0.5 }}>{product.name}</Typography>
      <Rating name="read-only" value={product.rating} readOnly size="small" sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
        <Typography variant="h6" color="error" fontWeight="bold">
          ${product.newPrice}
        </Typography>
        {product.oldPrice && (
          <Typography
            variant="body2"
            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
          >
            ${product.oldPrice}
          </Typography>
        )}
      </Stack>
    </CardContent>
  </Card>
);


const BestSeller = () => {
  const swiperRef = useRef(null);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          bgcolor: '#f5f5f5f8',
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 8,
          height: 300
        }}
      >
        <Stack spacing={2} sx={{ width: '100%', textAlign: 'left' }}>
          <Typography variant="subtitle2" color="text.secondary">Up To 50% Off</Typography>
          <Typography variant="h4" fontWeight="bold">For Pressure Monitor</Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: PRIMARY_COLOR,
              color: PRIMARY_COLOR,
              alignSelf: 'flex-start',
              width: 'fit-content',
              '&:hover': { bgcolor: `${PRIMARY_COLOR}10` }
            }}>
            View More
          </Button>
        </Stack>

        <Box sx={{ width: '40%', textAlign: 'center' }}>
          <img src='../../../public/Jolie/forpressuremonitor.jpg' alt="Pressure Monitor" style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }} />
        </Box>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">Popular Products</Typography>

          <Box>
            <IconButton
              onClick={() => swiperRef.current?.slidePrev()}
              sx={{ border: '1px solid #e0e0e0', mr: 1 }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => swiperRef.current?.slideNext()}
              sx={{ border: '1px solid #e0e0e0' }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Stack>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={false}
          style={{ paddingBottom: '20px' }}
        >
          {popularProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default BestSeller;
