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
  Button,
  TextField,
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
    case "Cancelled":
      return { color: "#ff4d4f", Icon: PendingIcon };
    default:
      return { color: "#3e4244ff", Icon: PendingIcon };
  }
};

const DeliveryStatus = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchOrders = () => {
    axios
      .get(`${BASE_URL}/orders`, config)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addOrder = () => {
    if (!customerName || !productName || !totalPrice) return;
    axios
      .post(
        `${BASE_URL}/orders`,
        {
          customerName,
          items: [{ productName }],
          totalPrice: Number(totalPrice),
          status: "Pending",
        },
        config
      )
      .then(() => {
        fetchOrders();
        setCustomerName("");
        setProductName("");
        setTotalPrice("");
      })
      .catch((err) => console.error(err));
  };

  const updateOrderStatus = (id, status) => {
    axios
      .put(`${BASE_URL}/orders/${id}`, { status }, config)
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };

  const deleteOrder = (id) => {
    axios
      .delete(`${BASE_URL}/orders/${id}`, config)
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "left", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Delivery Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tracking Delivery Status
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} mb={4}>
        <TextField
          label="Customer's Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <TextField
          label="Product's Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          label="Total Price"
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
        <Button variant="contained" onClick={addOrder}>
          Add Order
        </Button>
      </Stack>

      <Stack spacing={3}>
        {orders.map((item) => {
          const statusProps = getStatusProps(item.status);
          const StatusIcon = statusProps.Icon;
          const firstItem = item.items[0];

          return (
            <Card key={item._id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src="/Jolie/blisswelness.jpg"
                        alt={firstItem.productName}
                        sx={{
                          width: 56,
                          height: 56,
                          border: `2px solid ${PRIMARY_COLOR}`,
                        }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.customerName}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          Product:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {firstItem.productName}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          Total Price: ${item.totalPrice}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={1} sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          color: statusProps.color,
                          bgcolor: statusProps.color + "10",
                          borderRadius: 1,
                          px: 1,
                          py: 0.5,
                          alignSelf: "flex-start",
                        }}
                      >
                        <StatusIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="bold" sx={{ ml: 0.5 }}>
                          {item.status}
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        Delivery Date: {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Receiving Order Time:{" "}
                        <span
                          style={{
                            color: item.status === "Order is delivered" ? PRIMARY_COLOR : "gray",
                            fontWeight: "bold",
                          }}
                        >
                          {item.deliveredAt || "-----"}
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
};

export default DeliveryStatus;
