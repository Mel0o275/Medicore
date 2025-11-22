import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_API_URL;
function useDeleteProduct() {
  const queryClient = useQueryClient();
  const deleteProduct = useMutation({
    mutationFn: (product) =>
      axios.delete(`${url}/products/${product._id}`, {
        withCredentials: true,
        headers: { Authorization: token },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product is deleted!");
    },
    onError: () => toast.error("Failed to delete product."),
  });

  return { deleteProduct };
}

export default useDeleteProduct;
