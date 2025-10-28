import {z} from "zod";

const allowedCategories = ["website", "product", "delivery", "other"];

export const feedbackSchema = z.object({
    fullName: z.string().min(2, {message: "Full name is required min 2 characters "}),
    email: z.string().email({message: "Enter a valid email address"}),
    product: z.string().min(1, {message: "Please specify the product"}),
    review: z.string().min(10, {message: "Feedback must be at least 10 characters"}),
    rating: z.number().min(1, {message: "Please provide a rating"}),
    category: z
    .string()
    .nonempty({message: "Please select a category"})
    .refine((v) => allowedCategories.includes(v), {message: "Please select a  category"}),
});