import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Rating,
  TextField,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import useCreateReview from "../../Hooks/review/useCreateReview";
import useTheme from "../../Store/useTheme";

export default function ReviewForm({ productId }) {
  const theme = useTheme(); // <-- هنا ناخد theme
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

  const handleClose = () => {
    reset();
    setRating(0);
  };

  const { addReview, onSubmit } = useCreateReview(productId, handleClose);

  const dynamicTheme = createTheme({
    palette: {
      primary: {
        main: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
            },
          },
        },
      },
      MuiRating: {
        styleOverrides: {
          iconFilled: {
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          },
          iconHover: {
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            color: "#fff",
            "&:hover": {
              backgroundColor:
                theme.mode !== "dark" ? theme.secondaryText : theme.primaryText,
            },
            "&.Mui-disabled": {
              backgroundColor:
                theme.mode !== "dark" ? theme.secondaryText : theme.primaryText,
              color: "#ffffff",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={dynamicTheme}>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, rating))}
        className="p-6 shadow border border-gray-200"
      >
        <p className="text-sm -500 mb-4">
          Required fields are marked <span className="text-red-500">*</span>
        </p>

        <div
          className="mb-4"
          style={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          }}
        >
          <label className="block font-medium  mb-1">
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
            sx={{
              "& .MuiOutlinedInput-root": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                "& fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                "& fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              },
            }}
          />
        </div>

        <Button
          type="submit"
          disabled={addReview.isPending}
          className="!text-white rounded-md px-6 py-1 text-lg cursor-pointer"
        >
          {addReview.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </ThemeProvider>
  );
}
