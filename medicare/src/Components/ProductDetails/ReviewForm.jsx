import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Rating, TextField, createTheme, ThemeProvider } from "@mui/material";
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

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, ...formData });
    toast.success("Review submitted", {
      position: "top-center",
    });

    setFormData({
      title: "",
      review: "",
    });
    setRating(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className=" p-6 bg-white shadow border border-gray-200"
      >
        <p className="text-sm text-gray-500 mb-4">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Your Review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className=" bg-[#00a297] text-white rounded-md px-6 py-1 text-lg cursor-pointer"
        >
          Submit
        </button>
      </form>
    </ThemeProvider>
  );
}
