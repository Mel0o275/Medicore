import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

const orders = [
  {
    id: 1,
    customer: "Ahmed Ali",
    date: "2025-10-22",
    total: "$245.50",
    status: "Shipped",
    payment: "Credit Card",
  },
  {
    id: 2,
    customer: "Sara Mohamed",
    date: "2025-10-21",
    total: "$99.99",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 3,
    customer: "Omar Hassan",
    date: "2025-10-19",
    total: "$178.25",
    status: "Delivered",
    payment: "PayPal",
  },
];

const OrdersDash = () => {
  const orderKeys = orders.length > 0 ? Object.keys(orders[0]) : [];
  const excludedKeys = ["id"];
  const tableColumns = orderKeys.filter((key) => !excludedKeys.includes(key));

  const formatColumnName = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          📦 Orders Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
           
            borderRadius: "12px",
            textTransform: "none",
            px: 2.5,
            alignSelf: { xs: "stretch", sm: "auto" },
           
          }}
        >
          Add Order
        </Button>
      </Box>

      {/* Table Container */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          backgroundColor: "background.paper",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <TableContainer>
            <Table
              sx={{
                minWidth: 900,
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                  {tableColumns.map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {formatColumnName(key)}
                    </TableCell>
                  ))}
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f9fafb" },
                      transition: "0.2s",
                    }}
                  >
                    {tableColumns.map((key) => (
                      <TableCell key={key}>{order[key]}</TableCell>
                    ))}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                          flexWrap: "nowrap",
                        }}
                      >
                        <Tooltip title="View">
                          <IconButton color="info" size="small">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="warning" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrdersDash;
