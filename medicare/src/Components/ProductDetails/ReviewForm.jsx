import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  Rating,
  TextField,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#00a297",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#00a297",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00a297",
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#00a297",
          "&.Mui-checked": {
            color: "#00a297",
          },
        },
      },
    },
  },
});

export default function ReviewForm({ productId }) {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      review: "",
    },
  });
  const addReview = useMutation({
    mutationFn: (formData) =>
      axios.post(`${url}/reviews`, formData, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review added!");
      reset();
      setRating(0);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Failed adding review!");
    },
  });

  const onSubmit = (data) => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const payload = {
      productId,
      rating,
      title: data.title,
      review: data.review,
    };
    addReview.mutate(payload);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow border border-gray-200"
      >
        <p className="text-sm text-gray-500 mb-4">
          Required fields are marked <span className="text-red-500">*</span>
        </p>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <Rating
            value={rating}
            precision={0.1}
            onChange={(e, newValue) => setRating(newValue)}
            size="large"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Review Title"
            fullWidth
            variant="outlined"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Your Review"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            {...register("review", { required: "Review is required" })}
            error={!!errors.review}
            helperText={errors.review?.message}
          />
        </div>

        <Button
          type="submit"
          disabled={addReview.isPending}
          sx={{ background: "#00a297" }}
          className=" !text-white rounded-md px-6 py-1 text-lg cursor-pointer"
        >
          {addReview.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </ThemeProvider>
  );
}
