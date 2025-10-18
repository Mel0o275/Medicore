import React from 'react';
import { Container, Box, Typography, Button, Rating, Card, CardContent, CardMedia, Stack, Grid, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const PRIMARY_COLOR = '#00a297';

const popularProducts = [
    { id: 1, name: "Himalaya Baby Body Lotion", imageUrl: '../../../public/Jolie/blisswelness.jpg', rating: 5, oldPrice: 9.20, newPrice: 8 },
    { id: 2, name: "MCaffeine Moisturisation", imageUrl: '../../../public/Jolie/caffeine.jpg', rating: 5, oldPrice: 10.50, newPrice: 9 },
    { id: 3, name: "Liveasy Diabetic Protein", imageUrl: '../../../public/Jolie/liveasy.jpg', rating: 4, oldPrice: 5, newPrice: 4.50 },
    { id: 4, name: "Pharmassy Lumbar Sacro", imageUrl: '../../../public/Jolie/lumbarsacrosupportbelt.jpg', rating: 4, oldPrice: 20, newPrice: 18 },
];

// تم تغيير اسم المكون من Product إلى ProductCard
const ProductCard = ({ product }) => (
    <Card
        sx={{
            width: '100%',
            p: 1,
            borderRadius: 2,
            position: 'relative',
            boxShadow: 2
        }}
    >

        <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} sx={{ objectFit: 'contain', pt: 1 }} />

        <CardContent sx={{ pb: 1, textAlign: 'left' }}>

            <Typography variant="body1" sx={{ mt: 1, mb: 0.5 }}>{product.name}</Typography>

            <Rating name="read-only" value={product.rating} readOnly size="small" sx={{ mb: 1 }} />

            <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">

                <Typography variant="h6" color="error" fontWeight="bold">
                    ${product.newPrice}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary'
                    }}
                >
                    ${product.oldPrice}
                </Typography>

            </Stack>
        </CardContent>
    </Card>
);

const BestSeller = () => {
    return (
        <Container maxWidth="xl" sx={{ py: 5 }}>

            <Box
                sx={{
                    bgcolor: '#f5f5f5',
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

                <Stack spacing={2} sx={{ width: '40%', textAlign: 'left' }}>
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

                <Box sx={{ width: '60%', display: 'contents' }}>
                    <img src='../../../public/Jolie/forpressuremonitor.jpg' alt="Pressure Monitor" style={{ maxWidth: '80%', height: 'auto', maxHeight: '250px' }} />
                </Box>
            </Box>

            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">Popular Products</Typography>

                    <Box>
                        <IconButton sx={{ border: '1px solid #e0e0e0', mr: 1 }}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                        <IconButton sx={{ border: '1px solid #e0e0e0' }}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                    </Box>
                </Stack>

                <Grid
                    container
                    spacing={3}
                    alignItems="stretch"
                >
                    {popularProducts.map((product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={product.id}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={{ width: 250 }}>
                                <ProductCard product={product} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    );
};

export default BestSeller;