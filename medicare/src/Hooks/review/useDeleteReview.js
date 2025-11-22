import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
function useDeleteReview() {
  const queryClient = useQueryClient();
  const deleteReview = useMutation({
    mutationFn: (review) =>
      axios.delete(`${url}/reviews/${review._id}`, {
        withCredentials: true,
        headers: { Authorization: token },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review is deleted");
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Failed deleting review!");
    },
  });
  return { deleteReview };
}

export default useDeleteReview;
