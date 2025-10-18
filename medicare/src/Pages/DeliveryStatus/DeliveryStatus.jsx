import React from 'react';
import {
    Container,
    Box,
    Typography,
    Avatar,
    Stack,
    Card,
    CardContent,
    Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const PRIMARY_COLOR = '#00a297';

const deliveryData = [
    {
        id: 1,
        person: 'Jane',
        status: 'Delivered',
        statusText: 'Order is delivered',
        time: '03:45 PM',
        productName: 'Pulse Oximeter',
        productImage: '/Jolie/pulseoxemeter.jpg',
        orderedDate: '5/10/2025',
    },
    {
        id: 2,
        person: 'Natalie',
        status: 'Pending',
        statusText: 'Pending',
        time: '-----',
        productName: 'Lumbar Sacro Support Belt',
        productImage: '/Jolie/lumbarsacrosupportbelt.jpg',
        orderedDate: '22/8/2025',
    },
    {
        id: 3,
        person: 'John',
        status: 'On the way',
        statusText: 'Order is on the way',
        time: '10:15 AM',
        productName: 'Liveasy Diabetic Protein Powder',
        productImage: '/Jolie/liveasy.jpg',
        orderedDate: '12/9/2025',
    },
];

const getStatusProps = (status) => {
    switch (status) {
        case 'Delivered':
            return { color: PRIMARY_COLOR, Icon: CheckCircleIcon };
        case 'Pending':
            return { color: '#6c757d', Icon: PendingIcon };
        case 'On the way':
            return { color: '#007bff', Icon: AccessTimeFilledIcon };
        default:
            return { color: '#6c757d', Icon: PendingIcon };
    }
};

const DeliveryStatus = () => {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'left', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Delivery Status
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Tracking Delivery Status
                </Typography>
            </Box>

            <Stack spacing={3}>
                {deliveryData.map((item) => {
                    const { color, Icon } = getStatusProps(item.status);

                    return (
                        <Card
                            key={item.id}
                            sx={{
                                borderRadius: 3,
                                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-5px)' },
                            }}
                        >
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={8}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar
                                                src={item.productImage}
                                                alt={item.productName}
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    border: `2px solid ${PRIMARY_COLOR}`,
                                                }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {item.person}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    Product:{' '}
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        {item.productName}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Stack spacing={1}>
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    color,
                                                    bgcolor: color + '10',
                                                    borderRadius: 1,
                                                    px: 1,
                                                    py: 0.5,
                                                    width: 'fit-content',
                                                }}
                                            >
                                                <Icon fontSize="small" sx={{ mr: 0.5 }} />
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{ ml: 0.5 }}
                                                >
                                                    {item.statusText}
                                                </Typography>
                                            </Box>

                                            <Typography variant="caption" color="text.secondary">
                                                Delivery Date: {item.orderedDate}
                                            </Typography>

                                            <Typography variant="caption" color="text.secondary">
                                                Receiving Order:{' '}
                                                <span
                                                    style={{
                                                        color:
                                                            item.status === 'Delivered'
                                                                ? PRIMARY_COLOR
                                                                : '#6c757d',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {item.time}
                                                </span>
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Container>
    );
};

export default DeliveryStatus;
