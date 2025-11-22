import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");
const url = import.meta.env.VITE_API_URL;

function useCreateProduct(handleCloseAndReset) {
  const queryClient = useQueryClient();
  const addProduct = useMutation({
    mutationFn: (formData) =>
      axios.post(`${url}/products`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product added!");
      handleCloseAndReset();
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Failed to add product.");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("ratings", data.ratings || 0);
    formData.append("desc", data.desc || "");

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    addProduct.mutate(formData);
  };

  return { addProduct, onSubmit };
}

export default useCreateProduct;
