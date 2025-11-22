import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetReviews(productId) {
  const fetchReviews = async () => {
    const url = import.meta.env.VITE_API_URL;
    const { data } = await axios.get(`${url}/reviews/${productId}`);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: fetchReviews,
  });
  return { data, isLoading, isError, error };
}

export default useGetReviews;
