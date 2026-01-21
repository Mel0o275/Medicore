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

import useEditReview from "../../Hooks/review/useEditReview";

function EditReviewModal({ open, handleClose, selectedReview }) {
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

  const handleCloseAndExit = () => {
    reset();
    setRating(0);
    handleClose();
  };

  const { updateReview, onSubmit } = useEditReview(
    selectedReview,
    rating,
    handleCloseAndExit
  );

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
        sx={(theme) => ({
          width: { xs: "100%", sm: 450, md: 500 },
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          borderRadius: 3,
          boxShadow: theme.mode !== "dark"
            ? "0 6px 20px rgba(0,0,0,0.2)"
            : "0 6px 20px rgba(0,0,0,0.6)",
          color:
            theme.mode !== "dark"
              ? theme.primaryText
              : theme.primaryColor,
        })}
      >
        <Typography
          id="product-modal-title"
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={(theme) => ({
            color:
              theme.mode !== "dark"
                ? theme.primaryText
                : theme.primaryColor,
          })}
        >
          Edit Review
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 shadow border border-gray-200"
        >
          <div className="mb-4">
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
              sx={(theme) => ({
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              })}
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
              sx={(theme) => ({
                "& .MuiInputBase-root": {
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "& .MuiInputLabel-root": {
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
              })}
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
              sx={(theme) => ({
                "& .MuiInputBase-root": {
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "& .MuiInputLabel-root": {
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
              })}
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
              sx={(theme) => ({
                width: "fit-content",
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                "&:hover": {
                  backgroundColor:
                    theme.mode !== "dark"
                      ? `${theme.primaryText}22`
                      : `${theme.primaryColor}22`,
                },
                fontWeight: 600,
              })}
            >
              Close
            </Button>

            <Button
              type="submit"
              disabled={updateReview.isPending}
              variant="contained"
              sx={(theme) => ({
                width: "fit-content",
                backgroundColor:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                color:
                  theme.mode !== "dark"
                    ? theme.primaryColor
                    : theme.primaryText,
                "&:hover": {
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                  opacity: 0.9,
                },
              })}
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
