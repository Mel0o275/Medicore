import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingStars from "./RatingStars.jsx";
import { feedbackSchema } from "./FeedBackSchema.jsx";

export default function FeedbackInputFields({
  selectedCategory,
  onSubmit,
  onRate,
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      fullName: "",
      email: "",
      product: "",
      review: "",
      rating: 0,
      category: selectedCategory || "",
    },
  });

  useEffect(() => {
    setValue("category", selectedCategory || "");
  }, [selectedCategory, setValue]);

  const submit = async (data) => {
    await onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex-1">
      {selectedCategory ? (
        <div className="text-sm text-gray-500 mb-3">
          Selected: {selectedCategory}
        </div>
      ) : (
        <div className="text-sm text-red-500 mb-3">
          {errors.category?.message}
        </div>
      )}

      <label htmlFor="fullName" className="block text-sm text-gray-600 mb-2">
        Full Name
      </label>
      <input
        id="fullName"
        {...register("fullName")}
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Enter your full name"
        type="text"
        autoComplete="name"
      />
      {errors.fullName && (
        <div className="text-sm text-red-500 mt-1">
          {errors.fullName.message}
        </div>
      )}

      <label htmlFor="email" className="block text-sm text-gray-600 mt-4 mb-2">
        Email
      </label>
      <input
        id="email"
        {...register("email")}
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Enter your email address"
        type="email"
        autoComplete="email"
      />
      {errors.email && (
        <div className="text-sm text-red-500 mt-1">{errors.email.message}</div>
      )}

      <label
        htmlFor="product"
        className="block text-sm text-gray-600 mt-4 mb-2"
      >
        What would you like to give feedback on?
      </label>
      <input
        id="product"
        {...register("product")}
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="e.g. Quantum T-Shirt - Blue, Size L"
      />
      {errors.product && (
        <div className="text-sm text-red-500 mt-1">
          {errors.product.message}
        </div>
      )}

      <label className="block text-sm text-gray-600 mt-4 mb-2">
        Your Overall Rating
      </label>
      <Controller
        control={control}
        name="rating"
        render={({ field }) => (
          <RatingStars
            rating={field.value}
            onRate={(n) => {
              field.onChange(n);
              onRate?.(n);
            }}
          />
        )}
      />
      {errors.rating && (
        <div className="text-sm text-red-500 mt-1">{errors.rating.message}</div>
      )}

      <label htmlFor="review" className="block text-sm text-gray-600 mt-4 mb-2">
        Your Feedback
      </label>
      <textarea
        id="review"
        {...register("review")}
        rows={4}
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Write your feedback here..."
      />
      {errors.review && (
        <div className="text-sm text-red-500 mt-1">{errors.review.message}</div>
      )}

      <input type="hidden" {...register("category")} />

      <div className="flex items-center space-x-3 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-main text-white px-4 py-2 rounded-md shadow hover:bg-main-hover transform hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-150"
        >
          SUBMIT Feedback
        </button>
      </div>
    </form>
  );
}
