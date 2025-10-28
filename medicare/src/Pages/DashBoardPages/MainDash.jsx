import React, { useState } from "react";
import useEditProduct from "../../Hooks/useEditProduct.js";
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
  Avatar,
  AvatarGroup,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { products } from "../../Constants/NavPages.jsx";
import ViewProductModal from "./ViewProductModal.jsx";

const MainDash = () => {
  const {
    p,
    selectedProduct,
    register,
    handleSubmit,
    onSubmit,
    handleEdit,
    errors,
    setSelectedProduct,
  } = useEditProduct();
  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const productKeys = products.length > 0 ? Object.keys(products[0]) : [];
  const excludedKeys = ["id"];
  const tableColumns = productKeys.filter((key) => !excludedKeys.includes(key));

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderCellContent = (key, value) => {
    if (key === "images" && Array.isArray(value)) {
      return (
        <AvatarGroup
          max={isSmallScreen ? 2 : 4}
          sx={{
            justifyContent: "center",
            "& .MuiAvatar-root": {
              width: 50,
              height: 50,
              borderRadius: "10px",
              border: "2px solid #fff",
            },
          }}
        >
          {value.map((image, index) => (
            <Avatar key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </AvatarGroup>
      );
    }

    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string" && value.length > 40)
      return (
        <Tooltip title={value}>
          <span>{`${value.substring(0, 40)}...`}</span>
        </Tooltip>
      );

    return value;
  };

  const formatColumnName = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
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
          🧾 Product Management
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
          Add Product
        </Button>
      </Box>

      <Paper
        elevation={4}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                {tableColumns.map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      whiteSpace: "nowrap",
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
              {p.map((prod) => (
                <TableRow
                  key={prod.id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "0.2s",
                  }}
                >
                  {tableColumns.map((key) => (
                    <TableCell key={key}>
                      {renderCellContent(key, prod[key])}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Tooltip title="View">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => handleOpen(prod)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          color="warning"
                          size="small"
                          onClick={() => handleEdit(prod)}
                        >
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
      </Paper>

      {selectedProduct && (
        <div
          style={{
            background: "#f9f9f9",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            width: "300px",
            marginTop: "20px",
          }}
        >
          <h3>Edit Product</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />

            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>

            <div>
              <input
                {...register("title")}
                placeholder="New title"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              {errors.title && (
                <p style={{ color: "red" }}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("price")}
                placeholder="New price"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              {errors.price && (
                <p style={{ color: "red" }}>{errors.price.message}</p>
              )}
            </div>

            <button type="submit">💾 Save</button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedProduct(null)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}
      <ViewProductModal
        selectedProduct={selectedProduct}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default MainDash;
