import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");
const url = import.meta.env.VITE_API_URL;
function useCreateReview(productId, handleClose) {
  const queryClient = useQueryClient();
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
      handleClose();
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Failed adding review!");
    },
  });
  const onSubmit = (data, rating) => {
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
  return { addReview, onSubmit };
}

export default useCreateReview;
