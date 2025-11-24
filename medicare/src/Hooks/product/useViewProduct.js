import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;
function useViewProduct(id) {
  const fetchProduct = async () => {
    const { data } = await axios.get(`${url}/products/${id}`);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, isError, error };
}

export default useViewProduct;
