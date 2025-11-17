import CommentsContainer from "./CommentsContainer";
import ReviewForm from "./ReviewForm";
import { VscPreview } from "react-icons/vsc";
function ReviewSection({ reviews, productTitle }) {
  return (
    <div className="px-2 flex justify-between flex-wrap gap-10 ">
      <div className="flex flex-col gap-4  w-full xl:w-[48%] ">
        <h1 className="font-semibold text-2xl flex flex items-center gap-2">
          <VscPreview /> {reviews.length} review for {productTitle}
        </h1>
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
