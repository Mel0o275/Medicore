import { useState } from "react";
import CategoryButtons from "../../components/Feedback/CategoryButtons";
import FeedbackInputFields from "../../components/Feedback/FeedbackInputFields";
import SubmitButton from "../../components/Feedback/SubmitButton";

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Selected category:", categoryId);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
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
          <FeedbackInputFields selectedCategory={selectedCategory} />
        </div>
        <SubmitButton />
      </div>
    </div>
  );
}
