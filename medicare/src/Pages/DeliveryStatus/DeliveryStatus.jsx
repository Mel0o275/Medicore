import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  CardContent,
  Grid,
  Button
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const PRIMARY_COLOR = "#00a297";
const API = import.meta.env.VITE_API_URL;

const getStatusProps = (status) => {
  switch (status) {
    case "Order is delivered":
      return { color: PRIMARY_COLOR, Icon: CheckCircleIcon };
    case "Order is on the way":
      return { color: "#328ad3ff", Icon: AccessTimeFilledIcon };
    default:
      return { color: "#3e4244ff", Icon: PendingIcon };
  }
};

export default function DeliveryStatus() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchOrders = () => {
    axios
      .get(`${API}/orders/my-orders`, config)  
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.log("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (id, status) => {
    axios
      .put(`${API}/orders/${id}`, { status }, config)
      .then(() => fetchOrders())
      .catch((err) => console.log(err));
  };

  const deleteOrder = (id) => {
    axios
      .delete(`${API}/orders/${id}`, config)
      .then(() => fetchOrders())
      .catch((err) => console.log(err));
  };

  const calculateDeliveryDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 3);
    return orderDate.toLocaleDateString();
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "left", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Your Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your order delivery status
        </Typography>
      </Box>

      <Stack spacing={3}>
        {orders.map((order) => {
          const { color, Icon } = getStatusProps(order.status);

          return (
            <Card key={order._id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  
                  {/* Product Info */}
                  <Grid item xs={8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src="/Jolie/blisswelness.jpg"
                        sx={{
                          width: 56,
                          height: 56,
                          border: `2px solid ${PRIMARY_COLOR}`,
                        }}
                      />

                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Order #{order._id.slice(-6)}
                        </Typography>

                        {order.items?.map((p, i) => (
                          <Typography key={i} variant="body2">
                            {p.productName} — x{p.quantity}
                          </Typography>
                        ))}

                        <Typography variant="body2" fontWeight="bold">
                          Total: {order.totalPrice} EGP
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* Status + Date */}
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color,
                          background: color + "10",
                          px: 1,
                          py: 0.5,
                          borderRadius: "6px",
                          width: "fit-content",
                        }}
                      >
                        <Icon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography fontWeight="bold">{order.status}</Typography>
                      </Box>

                      <Typography variant="caption">
                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>

                      <Typography variant="caption">
                        Expected Delivery:{" "}
                        <span style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
                          {calculateDeliveryDate(order.createdAt)}
                        </span>
                      </Typography>

                      <Stack direction="row" spacing={1} mt={1}>
                        {order.status !== "Order is delivered" && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              updateOrderStatus(order._id, "Order is delivered")
                            }
                          >
                            Delivered
                          </Button>
                        )}

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => deleteOrder(order._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
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
}
