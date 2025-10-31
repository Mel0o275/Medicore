import { Rating } from "@mui/material";
import { TbThumbDownFilled, TbThumbUpFilled } from "react-icons/tb";
import avatar from "/avatar.jpg";

function MyComment({ review }) {
  return (
    <div className="bg-white border border-gray-200  p-4 md:p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={review.name}
            className="rounded-full w-[50px]"
          />
          <div>
            <h1 className="font-semibold text-gray-700">{review.name}</h1>
            <h3 className="text-sm text-gray-400">{Date.now()}</h3>
          </div>
        </div>
        <Rating
          value={review.rating}
          precision={0.5}
          readOnly
          size="small"
          sx={{
            "& .MuiRating-iconFilled": { color: "#fbbf24" },
          }}
        />
      </div>

      <p variant="body2" className="text-gray-500 leading-relaxed">
        {review.review}
      </p>

      <div className="flex gap-4 mt-2 mr-auto">
        <TbThumbUpFilled
          fontSize="medium"
          className="hover:text-[#00a297] cursor-pointer"
        />

        <TbThumbDownFilled
          fontSize="medium"
          className="hover:text-[#00a297] cursor-pointer"
        />
      </div>
    </div>
  );
}

export default MyComment;
