import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");
const url = import.meta.env.VITE_API_URL;

function useEditProduct(product, handleCloseAndReset) {
  const queryClient = useQueryClient();
  const updateProduct = useMutation({
    mutationFn: ({ id, formData }) =>
      axios.patch(`${url}/products/${id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated!");
      handleCloseAndReset();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.response?.data.message || "Failed to update product.");
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
    formData.append("secretProduct", String(data.secretProduct));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) =>
        formData.append("images", file)
      );
    }

    updateProduct.mutate({ id: product._id, formData });
  };
  return { updateProduct, onSubmit };
}

export default useEditProduct;
