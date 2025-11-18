import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GrUpdate } from "react-icons/gr";
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
  ratings: z.coerce.number().min(0).max(5),
  desc: z.string().max(500),
  images: z.any(),
  secretProduct: z.boolean(),
});

export default function EditProductModal({ open, handleClose, product }) {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
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
      secretProduct: false,
    },
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("ratings", product.ratings);
      setValue("desc", product.desc);
      setValue("secretProduct", product.secretProduct ?? false);
      setPreviewImages(product.images || []);
    }
  }, [product, setValue]);

  const updateProduct = useMutation({
    mutationFn: ({ id, formData }) =>
      axios.patch(`${url}/products/${id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated!");
      handleCloseAndReset();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update product.");
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
    formData.append("secretProduct", String(data.secretProduct));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) =>
        formData.append("images", file)
      );
    }

    updateProduct.mutate({ id: product._id, formData });
  };

  const handleCloseAndReset = () => {
    reset();
    setPreviewImages([]);
    handleClose();
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={open} onClose={handleCloseAndReset}>
        <Box sx={MODAL_STYLE}>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Edit Product</Typography>
            <IconButton onClick={handleCloseAndReset} size="small">
              <MdOutlineCancel />
            </IconButton>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                flexWrap="wrap"
                justifyContent="center"
              >
                {previewImages.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img.url}
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Stack>

              <TextField
                label="Title"
                fullWidth
                size="small"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                label="Brand"
                fullWidth
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
                  {...register("category")}
                  error={!!errors.category}
                  defaultValue={product?.category || ""}
                >
                  {categories.map((cat, i) => (
                    <MenuItem key={i} value={cat.title}>
                      {cat.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Price"
                type="number"
                fullWidth
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
                size="small"
                {...register("desc")}
                error={!!errors.desc}
                helperText={errors.desc?.message}
              />
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
              <Controller
                name="secretProduct"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "&.Mui-checked": { color: "#00a297" },
                          "& .MuiSvgIcon-root": { fontSize: 24 },
                        }}
                      />
                    }
                    label="Secret Product"
                  />
                )}
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
                disabled={updateProduct.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<GrUpdate />}
                disabled={updateProduct.isPending}
              >
                {updateProduct.isPending ? "Updating" : "Update Product"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
