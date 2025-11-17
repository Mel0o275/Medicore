import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
    id: z.string(),
    title: z.string().min(2, "Title is required"),
    price: z.string().min(1, "Price is required"),
});

export default function useEditProduct(onUpdateProduct) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleEdit = (product) => {
        setSelectedProduct(product);
        reset({
            id: product.id.toString(),
            title: product.title,
            price: product.price.toString(),
        });
    };

    const onSubmit = (data) => {
        const updatedProduct = {
            id: parseInt(data.id),
            title: data.title,
            price: parseFloat(data.price),
        };
        onUpdateProduct(updatedProduct);
        setSelectedProduct(null);
    };

    return {
        selectedProduct,
        register,
        handleSubmit,
        onSubmit,
        handleEdit,
        errors,
        setSelectedProduct,
    };
}
