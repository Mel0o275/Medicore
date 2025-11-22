import { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import useShopFilters from "../../Hooks/useShopFilters.js";
import ViewProductModal from "./ViewProductModal.jsx";
import AddProductModal from "../../Components/AddProduct/AddProduct.jsx";
import EditProductModal from "../../Components/EditProduct/EditProduct.jsx";
import useAllProducts from "../../Hooks/useAllProducts.js";
import useDeleteProduct from "../../Hooks/product/useDeleteProduct.js";
import ShopLoading from "../../Components/shop/ShopLoading.jsx";
import ShopError from "../../Components/shop/ShopError.jsx";

const MainDash = () => {
  const { filters } = useShopFilters();
  const { data, isLoading, isError, error } = useAllProducts(filters, "admin");
  const products = data?.data?.products || [];

  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const pageCount = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const [toDelete, setToDelete] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const handleDeleteClick = (product) => setToDelete(product);
  const { deleteProduct } = useDeleteProduct();
  const confirmDelete = () => {
    deleteProduct.mutate(toDelete);
    setToDelete(null);
  };
  const cancelDelete = () => setToDelete(null);

  const handleOpenViewModal = (product) => {
    setViewingProduct(product);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewingProduct(null);
  };

  const handleOpenEditModal = (product) => setEditingProduct(product);
  const handleCloseEditModal = () => setEditingProduct(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const tableColumns = [
    "_id",
    "images",
    "title",
    "secretProduct",
    "createdAt",
    "updatedAt",
  ];

  const renderCellContent = (key, value) => {
    if (key === "images" && Array.isArray(value) && value.length > 0) {
      return (
        <Avatar
          src={value[0].url}
          alt="Image"
          sx={{
            width: 50,
            height: 50,
            borderRadius: "10px",
            border: "2px solid #fff",
          }}
        />
      );
    }
    if (typeof value === "string" && value.length > 40) {
      return (
        <Tooltip title={value}>
          <span>{`${value.substring(0, 40)}...`}</span>
        </Tooltip>
      );
    }
    if (key === "secretProduct") return <span>{value ? "Yes" : "No"}</span>;
    if (key === "createdAt" || key === "updatedAt")
      return <span>{new Date(value).toLocaleString()}</span>;
    return value;
  };

  const formatColumnName = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

  if (isLoading) return <ShopLoading />;
  if (isError) return <ShopError error={error} />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          🧾 Product Management
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          You have {products.length} products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: "12px", textTransform: "none", px: 2.5 }}
          onClick={handleOpenAddModal}
        >
          Add Product
        </Button>
      </Box>

      <Paper elevation={4} sx={{ borderRadius: "16px", overflow: "hidden" }}>
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
                      textAlign: "center",
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
              {paginatedProducts.map((prod) => (
                <TableRow
                  key={prod._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "0.2s",
                  }}
                >
                  {tableColumns.map((key) => (
                    <TableCell
                      key={`${prod._id}-${key}`}
                      sx={{ textAlign: "center" }}
                    >
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

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      <EditProductModal
        open={!!editingProduct}
        handleClose={handleCloseEditModal}
        product={editingProduct}
      />
      <ViewProductModal
        selectedProduct={viewingProduct}
        open={openViewModal}
        handleClose={handleCloseViewModal}
      />
      <AddProductModal open={openAddModal} handleClose={handleCloseAddModal} />

      <Dialog
        open={!!toDelete}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{toDelete?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleteProduct.isPending} onClick={cancelDelete}>
            Cancel
          </Button>
          <Button
            disabled={deleteProduct.isPending}
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            {deleteProduct.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainDash;
