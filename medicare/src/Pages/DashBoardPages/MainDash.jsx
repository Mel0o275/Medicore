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
  Tooltip,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import ViewProductModal from "./ViewProductModal.jsx";
import AddProductModal from "../../Components/AddProduct/AddProduct.jsx";
import EditProductModal from "../../Components/EditProduct/EditProduct.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreenAnimation from "../../Animations/LoadingScreenAnimation.jsx";
import useShopFilters from "../../Hooks/useShopFilters.js";

const MainDash = () => {
  const { filters } = useShopFilters();
  const fetchProducts = async () => {
    const url = import.meta.env.VITE_API_URL;
    const { data } = await axios.get(
      `${url}/products${filters ? `?${filters}` : ""}`
    );
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
  });

  const products = data?.data?.products;
  const [toDelete, setToDelete] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  function handleDeleteClick(product) {
    setToDelete(product);
  }

  function confirmDelete() {
    if (!toDelete) return;
    setToDelete(null);
  }

  function cancelDelete() {
    setToDelete(null);
  }

  function handleUpdateProduct(updatedProduct) {
    setEditingProduct(null);
  }

  function handleAddProduct(newProduct) {
    console.log("Adding new product:", newProduct);

    // const completeProduct = {
    //   id: newId,
    //   title: newProduct.title,
    //   category: newProduct.category,
    //   price: newProduct.price,
    //   description: newProduct.description,
    //   images: newProduct.images || [],
    // };

    handleCloseAddModal();

    // console.log("Product added successfully:", completeProduct);
  }

  const {
    register,
    handleSubmit,
    onSubmit,
    handleEdit,
    errors,
    setSelectedProduct,
  } = useEditProduct(handleUpdateProduct);

  const handleOpenViewModal = (product) => {
    setViewingProduct(product);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewingProduct(null);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    handleEdit(product);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setSelectedProduct(null);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const tableColumns = ["_id", "images", "title", "createdAt", "updatedAt"];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderCellContent = (key, value) => {
    if (key === "images" && Array.isArray(value) && value.length > 0) {
      return (
        <Avatar
          src={value[0].url}
          alt="Image 1"
          sx={{
            width: 50,
            height: 50,
            borderRadius: "10px",
            border: "2px solid #fff",
          }}
        />
      );
    }

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

  if (isLoading) return <LoadingScreenAnimation />;
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
          onClick={handleOpenAddModal}
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
                {tableColumns.map((key, i) => (
                  <TableCell
                    key={i}
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
              {products.map((prod) => (
                <TableRow
                  key={prod._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "0.2s",
                  }}
                >
                  {tableColumns.map((key, j) => (
                    <TableCell key={`${prod._id}-${key}`}>
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
                          onClick={() => handleOpenViewModal(prod)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          color="warning"
                          size="small"
                          onClick={() => handleOpenEditModal(prod)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(prod)}
                        >
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

      {/* Edit Modal */}
      <EditProductModal
        open={!!editingProduct}
        handleClose={handleCloseEditModal}
        selectedProduct={editingProduct}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />

      {/* View Modal */}
      <ViewProductModal
        selectedProduct={viewingProduct}
        open={openViewModal}
        handleClose={handleCloseViewModal}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!toDelete}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{toDelete?.title || toDelete?.name}
            "?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Modal */}
      <AddProductModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        onAddProduct={handleAddProduct}
      />
    </Box>
  );
};

export default MainDash;
