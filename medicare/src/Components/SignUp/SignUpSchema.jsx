import { z } from "zod";

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "First name is required.",
            })
            .refine((val) => val.trim().length >= 3, {
                message: "First name must be at least 3 characters.",
            })
            .refine(
                (val) => {
                    const trimmed = val.trim();
                    const first = trimmed.charAt(0);
                    return first === first.toUpperCase();
                },
                { message: "First name must start with an uppercase letter." }
            ),
        lastName: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Last name is required.",
            })
            .refine((val) => val.trim().length >= 3, {
                message: "Last name must be at least 3 characters.",
            })
            .refine(
                (val) => {
                    const trimmed = val.trim();
                    const first = trimmed.charAt(0);
                    return first === first.toUpperCase();
                },
                { message: "Last name must start with an uppercase letter." }
            ),
        email: z
            .string()
            .min(1, { message: "Email is required." })
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Email is required.",
            })
            //regex for email validation
            .refine(
                (val) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(val);
                },
                { message: "Please enter a valid email address." }
            ),

        phone: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Phone number is required.",
            })
            //regex for phone number validation starts with 0 + 10 digits
            .refine(
                (val) => {
                    const phoneRegex = /^0\d{10}$/;
                    return phoneRegex.test(val);
                },
                { message: "Please enter a valid phone number." }
            )
            .refine(
                (val) => {
                    const trimmed = val.trim();
                    for (let i = 0; i < trimmed.length; i++) {
                        const ch = trimmed[i];
                        if (!(ch >= "0" && ch <= "9")) return false;
                    }
                    return true;
                },
                { message: "Phone number must contain only digits." }
            ),
        // allow null/empty from the form but enforce selection via refine so we return a friendly message
        gender: z
            .string()
            .nullable()
            .refine((val) => val === "male" || val === "female", {
                message: "Please select a gender.",
            }),
        birthdate: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Please provide your date of birth.",
            }),

        password: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Password is required.",
            })
            .refine((val) => val.length >= 8, {
                message: "Password must be at least 8 characters long.",
            })
            .refine(
                (val) => {
                    const hasUppercase = /[A-Z]/.test(val);
                    const hasLowercase = /[a-z]/.test(val);
                    const hasNumber = /[0-9]/.test(val);
                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
                    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
                },
                {
                    message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                }
            ),
        confirmPassword: z
            .string()
            .refine((val) => typeof val === "string" && val.trim() !== "", {
                message: "Please confirm your password.",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });