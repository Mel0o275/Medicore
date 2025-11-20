import { useState } from "react";

export default function useEditProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  return {
    selectedProduct,
    handleEdit,
    setSelectedProduct,
  };
}
