import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;
function useAllProducts(filters = "", role = "") {
  const fetchProducts = async () => {
    let directURL = "";
    if (role === "admin") {
      directURL = `${url}/products?${filters ? `${filters}&` : ""}role=admin`;
    } else {
      directURL = `${url}/products${filters ? `?${filters}` : ""}`;
    }
    const { data } = await axios.get(directURL);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, isError, error };
}

export default useAllProducts;
