import CommentsContainer from "./CommentsContainer";
import ReviewForm from "./ReviewForm";
import { VscPreview } from "react-icons/vsc";
import useAuthStore from "../../Store/useAuthStore";
import useGetReviews from "../../Hooks/review/useGetReviews";
let accent = "#00a297";

function ReviewSection({ productTitle, productId }) {
  const { data, isLoading, isError, error } = useGetReviews(productId);
  const reviews = data?.data?.reviews;
  const reviewsNumber = data?.results;
  const user = useAuthStore((state) => state.user);
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full py-5">
        <div className="w-10 h-10 border-4 border-t-transparent border-[#00a297] rounded-full animate-spin"></div>
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500">
        {error?.message || "Failed to load reviews."}
      </p>
    );
  return (
    <div className="px-2 flex justify-between flex-wrap gap-10 ">
      <div
        className={`flex flex-col gap-4  w-full ${user ? "xl:w-[48%]" : ""}  `}
      >
        {reviewsNumber > 0 ? (
          <h1 className="font-semibold text-2xl flex  gap-2">
            <VscPreview className="text-4xl" /> {reviewsNumber} review for{" "}
            {productTitle}
          </h1>
        ) : (
          ""
        )}
        {isLoading ? (
          <div className="mt-5 p-8 w-full mx-auto flex items-center justify-center">
            <div
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: `${accent}44`, borderTopColor: accent }}
            ></div>
          </div>
        ) : reviewsNumber === 0 ? (
          <div
            className="mt-5 p-8 w-full mx-auto text-center rounded-2xl shadow-md flex flex-col items-center justify-center border"
            style={{ borderColor: accent, backgroundColor: `${accent}15` }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow"
              style={{ backgroundColor: `${accent}22` }}
            >
              <VscPreview className="text-4xl" style={{ color: accent }} />
            </div>

            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: accent }}
            >
              No Reviews Found
            </h2>
            <p className="text-sm text-gray-700 max-w-md">
              Be the first to leave a review for this product!
            </p>
          </div>
        ) : (
          <CommentsContainer reviews={reviews} userId={user?.data?.id} />
        )}
      </div>
      {user && (
        <div className="flex flex-col gap-4  w-full xl:w-[48%]">
          <h1 className="font-semibold text-xl">Add a Review</h1>
          <ReviewForm productId={productId} />
        </div>
      )}
    </div>
  );
}

export default ReviewSection;
