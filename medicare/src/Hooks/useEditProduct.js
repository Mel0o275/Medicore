import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { products } from "../Constants/NavPages";

export default function useEditProduct() {
    const [p, setp] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const schema = z.object({
        id: z.string().min(1, "Id is required"),
        title: z.string().min(2, "Title must be at least 2 characters"),
        price: z.string().min(1, "Price is required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: "",
            title: "",
            price: "",
        },
        resolver: zodResolver(schema),
    });

    function handleEdit(product) {
        setSelectedProduct(product);
        reset({
            id: product.id.toString(),
            title: product.title,
            price: product.price.toString(),
        });
    }

    function onSubmit(data) {
        const updatedProduct = {
            id: parseInt(data.id),
            title: data.title,
            price: parseFloat(data.price),
        };

        const updatedList = p.map((item) =>
            item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item
        );

        setp(updatedList);
        console.log("Updated Products:", updatedList);
        setSelectedProduct(null);
    }

    return {
        p,
        selectedProduct,
        register,
        handleSubmit,
        onSubmit,
        handleEdit,
        errors,
        setSelectedProduct,
    };
}
