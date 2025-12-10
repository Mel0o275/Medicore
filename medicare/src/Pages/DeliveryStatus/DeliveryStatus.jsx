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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: Bearer ${token} },
  };

  const fetchOrders = async () => {
    if (!token) {
      console.log("No token found!");
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(${API}/orders/my-orders, config);
      console.log("Data from API:", res.data); // تيست للتأكد من البيانات
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error fetching orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(${API}/orders/${id}, { status }, config);
      fetchOrders();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(${API}/orders/${id}, config);
      fetchOrders();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const calculateDeliveryDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 3);
    return orderDate.toLocaleDateString();
  };

  if (loading) return <Typography>Loading orders...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (orders.length === 0) return <Typography>No orders yet.</Typography>;

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
                          border: 2px solid ${PRIMARY_COLOR},
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