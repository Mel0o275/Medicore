import CommentsContainer from "./CommentsContainer";
import ReviewForm from "./ReviewForm";
import ProductRating from "./ProductRating";
function ReviewSection({ reviews }) {
  return (
    <div className="px-2 flex justify-between flex-wrap gap-10 ">
      <div className="flex flex-col gap-4  w-full xl:w-[48%] ">
        <h1 className="font-semibold text-xl">
          {reviews.length} review for Pharmeasy Lumbar Sacro Support Belt-Pain
          Relief
        </h1>
        <ProductRating reviews={reviews} />
        <h1 className="font-semibold text-xl">Comments</h1>
        <CommentsContainer reviews={reviews} />
      </div>
      <div className="flex flex-col gap-4  w-full xl:w-[48%]">
        <h1 className="font-semibold text-xl">Add a Review</h1>
        <ReviewForm />
      </div>
    </div>
  );
}

export default ReviewSection;
