import {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import CategoryButtons from "../../Components/Feedback/CategoryButtons.jsx";
import FeedbackInputFields
    from "../../Components/Feedback/FeedbackInputFields.jsx";

export default function FeedbackPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSubmitFeedback = async () => {
        setSubmitting(true);
        setError(null);

        try {
            // simulate a short submit delay
            await new Promise((res) => setTimeout(res, 700));

            toast.success("Feedback sent. Thanks!");
            setSuccess("Thanks — feedback submitted");
            setTimeout(() => setSuccess(null), 4000);
        } catch (err) {
            const msg = err?.message || "Submission failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <Toaster position="top-right"/>
            <h1 className="text-3xl font-extrabold text-center mb-2">
                We'd Love to Hear From You
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Your thoughts help us get better.
            </p>

            <div className="block w-full">
                <CategoryButtons onSelectCategory={handleSelectCategory}/>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <FeedbackInputFields
                        selectedCategory={selectedCategory}
                        onSubmit={handleSubmitFeedback}
                        onRate={(n) => console.log("Rated:", n)}
                    />
                </div>

                {submitting && (
                    <div className="text-sm text-gray-500 mt-4">Submitting...</div>
                )}
                {success && (
                    <div className="text-sm text-green-600 mt-4">{success}</div>
                )}
                {error && <div className="text-sm text-red-600 mt-4">{error}</div>}
            </div>
        </div>
    );
}