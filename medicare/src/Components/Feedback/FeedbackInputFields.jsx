import { useState } from "react";
import RatingStars from "./RatingStars";

export default function FeedbackInputFields({
  onRate = () => {},
  selectedCategory,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    product: "",
    review: "",
    rating: 0,
  });

  const { fullName, email, product, review, rating } = form;

  return (
    <div className="flex-1">
      {selectedCategory ? (
        <div className="text-sm text-gray-500 mb-3">
          Selected: {selectedCategory}
        </div>
      ) : null}
      <label htmlFor="fullName" className="block text-sm text-gray-600 mb-2">
        Full Name
      </label>
      <input
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, fullName: e.target.value }))
        }
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Enter your full name"
        type="text"
        autoComplete="name"
      />

      <label htmlFor="email" className="block text-sm text-gray-600 mt-4 mb-2">
        Email
      </label>
      <input
        id="email"
        name="email"
        value={email}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Enter your email address"
        type="email"
        autoComplete="email"
      />

      <label
        htmlFor="product"
        className="block text-sm text-gray-600 mt-4 mb-2"
      >
        What would you like to give feedback on?
      </label>
      <input
        id="product"
        name="product"
        value={product}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, product: e.target.value }))
        }
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="e.g. Quantum T-Shirt - Blue, Size L"
      />

      <label className="block text-sm text-gray-600 mt-4 mb-2">
        Your Overall Rating
      </label>
      <RatingStars
        rating={rating}
        onRate={(n) => {
          setForm((prev) => ({ ...prev, rating: n }));
          //if it true call the callback
          onRate && onRate(n);
        }}
      />

      <label htmlFor="review" className="block text-sm text-gray-600 mt-4 mb-2">
        Your Feedback
      </label>
      <textarea
        id="review"
        name="review"
        value={review}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, review: e.target.value }))
        }
        rows={4}
        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main"
        placeholder="Write your feedback here..."
      />
    </div>
  );
}
