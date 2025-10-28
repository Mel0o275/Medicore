import {z} from "zod";

const trimToString = (value) => (value ?? "").toString().trim();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signInSchema = z.object({
    email: z
    .string()
    .transform((v) => trimToString(v).toLowerCase())
    .refine((v) => v.length > 0, {message: "Email is required."})
    .refine((v) => EMAIL_REGEX.test(v), {
        message: "Please enter a valid email address.",
    }),

    password: z
    .string()
    .transform((v) => (v ?? "").toString().trim())
    .refine((v) => v.length > 0, {message: "Password is required."}),
});

export default signInSchema;
