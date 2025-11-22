import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
function useEditReview(selectedReview, rating, handleCloseAndExit) {
  const queryClient = useQueryClient();
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
      handleCloseAndExit();
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
  return { updateReview, onSubmit };
}

export default useEditReview;
