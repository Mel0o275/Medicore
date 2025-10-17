import { FaStar as StarSolid } from "react-icons/fa";
import { FaRegStar as StarOutline } from "react-icons/fa";

export default function RatingStars({ rating, onRate }) {
  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <button
          key={starIndex}
          onClick={() => onRate(starIndex)}
          className={`p-1 rounded-md ${
            rating >= starIndex ? "text-main" : "text-gray-300"
          } hover:text-main transition-colors`}
        >
          {rating >= starIndex ? (
            <StarSolid className="h-6 w-6" />
          ) : (
            <StarOutline className="h-6 w-6" />
          )}
        </button>
      ))}
    </div>
  );
}
