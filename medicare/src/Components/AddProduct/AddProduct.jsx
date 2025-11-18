import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoMdCreate } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { categories } from "../../Constants/NavPages";

const PRIMARY_COLOR = "#00a297";
const customTheme = createTheme({
  palette: { primary: { main: PRIMARY_COLOR } },
});

const MODAL_STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  overflowY: "auto",
  p: 3,
  height: "90vh",
};

const productSchema = z.object({
  title: z.string().min(2).max(100),
  brand: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number().positive(),
  ratings: z.coerce
    .number()
    .min(0, "Ratings cannot be negative")
    .max(5, "Ratings cannot exceed 5"),
  desc: z.string().max(500),
  images: z.any(),
});

export default function AddProductModal({ open, handleClose }) {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      brand: "",
      category: "",
      price: 0,
      ratings: 0,
      desc: "",
    },
  });

  const addProduct = useMutation({
    mutationFn: (formData) =>
      axios.post(`${url}/products`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product added!");
      reset();
      handleClose();
    },
    onError: (err) => {
      console.error(err.response?.data.message || err);
      toast.error("Failed to add product.");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("ratings", data.ratings || 0);
    formData.append("desc", data.desc || "");

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    addProduct.mutate(formData);
  };

  const handleCloseAndReset = () => {
    reset();
    handleClose();
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={open} onClose={handleCloseAndReset}>
        <Box sx={MODAL_STYLE}>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Add New Product</Typography>
            <IconButton onClick={handleCloseAndReset} size="small">
              <MdOutlineCancel />
            </IconButton>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Box
                sx={{
                  border: errors.images
                    ? "1px solid #d32f2f"
                    : "1px solid #ccc",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Product Images *
                </Typography>
                <input type="file" multiple {...register("images")} />
                {errors.images && (
                  <Typography variant="caption" color="error">
                    {errors.images.message}
                  </Typography>
                )}
              </Box>

              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                size="small"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Brand"
                fullWidth
                variant="outlined"
                size="small"
                {...register("brand")}
                error={!!errors.brand}
                helperText={errors.brand?.message}
              />

              <FormControl fullWidth size="small">
                <InputLabel id="category-label-edit">Category</InputLabel>
                <Select
                  labelId="category-label-edit"
                  label="Category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  defaultValue={""}
                >
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category.title}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
                inputProps={{ step: 0.01, min: 0.01 }}
              />

              <TextField
                label="Ratings"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                {...register("ratings")}
                error={!!errors.ratings}
                helperText={errors.ratings?.message}
                inputProps={{ step: 0.01, min: 0.01 }}
              />

              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                size="small"
                {...register("desc")}
                error={!!errors.desc}
                helperText={errors.desc?.message}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1.5}
              mt={3}
            >
              <Button
                onClick={handleCloseAndReset}
                color="error"
                startIcon={<MdOutlineCancel />}
                type="button"
                disabled={addProduct.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<IoMdCreate />}
                disabled={addProduct.isPending}
              >
                {addProduct.isPending ? "Creating..." : "Create Product"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
