import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CategoryButtons from "../../Components/Feedback/CategoryButtons.jsx";
import FeedbackInputFields from "../../Components/Feedback/FeedbackInputFields.jsx";
import axios from "axios";
export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const API_URL = import.meta.env.VITE_API_URL;
  // api call to submit feedback
  const handleSubmitFeedback = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/feedback`,
        data: {
          fullName: data.fullName,
          email: data.email,
          product: data.product,
          review: data.review,
          rating: data.rating,
          category: data.category,
        },
      });
      // if res is 200 or 201 show success toast
      if (res.status === 200 || res.status === 201) {
        toast.success("Feedback sent. Thanks!");
      } else {
        toast.error("Submission failed");
      }
    } catch (err) {
      console.log("Error submitting feedback:", err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-extrabold text-center mb-2">
        We'd Love to Hear From You
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Your thoughts help us get better.
      </p>

      <div className="block w-full">
        <CategoryButtons onSelectCategory={handleSelectCategory} />
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <FeedbackInputFields
            selectedCategory={selectedCategory}
            onSubmit={handleSubmitFeedback}
            onRate={(n) => console.log("Rated:", n)}
          />
        </div>
      </div>
    </div>
  );
}
