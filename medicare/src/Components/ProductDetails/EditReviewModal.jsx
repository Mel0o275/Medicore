import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function EditReviewModal({ open, handleClose, selectedReview }) {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
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

  useEffect(() => {
    if (selectedReview) {
      reset({
        title: selectedReview.title,
        review: selectedReview.review,
      });
      setRating(selectedReview.rating);
    }
  }, [selectedReview, reset, open]);

  const updateReview = useMutation({
    mutationFn: ({ reviewId, payload }) =>
      axios.patch(`${url}/reviews/${reviewId}`, payload, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review updated!");
      reset();
      setRating(0);
      handleClose();
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Failed editing review!");
    },
  });

  const onSubmit = (data) => {
    if (!rating) {
      toast.error("Please select a rating", { position: "top-center" });
      return;
    }

    const payload = {
      rating,
      title: data.title,
      review: data.review,
    };

    updateReview.mutate({
      reviewId: selectedReview._id,
      payload,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: 450, md: 500 },
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          id="product-modal-title"
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Edit Review
        </Typography>

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
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              onClick={handleClose}
              variant="text"
              disabled={updateReview.isPending}
              sx={{
                width: "fit-content",
                color: "oklch(50.5% 0.213 27.518)",
                "&:hover": {
                  backgroundColor: "oklch(93.6% 0.032 17.717)",
                },
                fontWeight: 600,
              }}
            >
              Close
            </Button>

            <Button
              type="submit"
              disabled={updateReview.isPending}
              variant="contained"
              sx={{
                width: "fit-content",
                backgroundColor: "#00a297",
                color: "white",
                "&:hover": {
                  backgroundColor: "#008b82",
                },
              }}
            >
              {updateReview.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
}

export default EditReviewModal;
