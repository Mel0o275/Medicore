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
const BASE_URL = import.meta.env.VITE_API_URL;

const getStatusProps = (status) => {
  switch (status) {
    case "Order is delivered":
      return { color: PRIMARY_COLOR, Icon: CheckCircleIcon };
    case "Pending":
      return { color: "#3e4244ff", Icon: PendingIcon };
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
    headers: { Authorization: token },
  };

  const fetchOrders = () => {
    axios
      .get(`${BASE_URL}/orders`, config)
      .then((res) => {

        const updated = res.data.orders.map((order) => {
          const created = new Date(order.createdAt);
          const delivery = new Date(created);
          delivery.setDate(created.getDate() + 3);

          return {
            ...order,
            deliveryDate: order.deliveryDate || delivery,
          };
        });

        setOrders(updated);
      })
      .catch((err) => console.log("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (id, status) => {
    axios
      .put(`${BASE_URL}/orders/${id}`, { status }, config)
      .then(() => fetchOrders())
      .catch((err) => console.log(err));
  };

  const deleteOrder = (id) => {
    axios
      .delete(`${BASE_URL}/orders/${id}`, config)
      .then(() => fetchOrders())
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "left", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Order Delivery Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your delivery details
        </Typography>
      </Box>

      <Stack spacing={3}>
        {orders.map((item) => {
          const statusProps = getStatusProps(item.status);
          const StatusIcon = statusProps.Icon;

          return (
            <Card key={item._id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  
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
                          Your Order
                        </Typography>

                        {item.items?.map((p, index) => (
                          <Typography key={index} variant="body2">
                            {p.productName} — x{p.quantity}
                          </Typography>
                        ))}

                        <Typography variant="body2" fontWeight="bold">
                          Total: {item.totalPrice} EGP
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: statusProps.color,
                          background: statusProps.color + "10",
                          px: 1,
                          py: 0.5,
                          borderRadius: "6px",
                          width: "fit-content",
                        }}
                      >
                        <StatusIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography fontWeight="bold">{item.status}</Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        Order Date: {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Expected Delivery:{" "}
                        <span style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
                          {new Date(item.deliveryDate).toLocaleDateString()}
                        </span>
                      </Typography>

                      <Stack direction="row" spacing={1} mt={1}>
                        {item.status !== "Order is delivered" && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => updateOrderStatus(item._id, "Order is delivered")}
                          >
                            Delivered
                          </Button>
                        )}

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => deleteOrder(item._id)}
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
