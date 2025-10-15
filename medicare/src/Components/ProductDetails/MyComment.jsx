import { Rating } from "@mui/material";
import { TbThumbDownFilled, TbThumbUpFilled } from "react-icons/tb";
import Avatar from "/avatar.jpg";
function MyComment() {
  let { name, date, rating, title, comment, avatarUrl } = {
    name: "Jennifer",
    date: "October 13, 2024",
    rating: 4,
    title: "Wow it's amazing.",
    comment:
      "This product is good quality made. Also very strong spring mechanism. Very good for exercise.",
    avatarUrl: Avatar,
  };
  return (
    <div className="bg-white border border-gray-200  p-4 md:p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src={avatarUrl} alt={name} className="rounded-full w-[50px]" />
          <div>
            <h1 className="font-semibold text-gray-700">{name}</h1>
            <h3 className="text-sm text-gray-400">{date}</h3>
          </div>
        </div>
        <Rating
          value={rating}
          precision={0.5}
          readOnly
          size="small"
          sx={{
            "& .MuiRating-iconFilled": { color: "#fbbf24" },
          }}
        />
      </div>

      <p variant="subtitle1" className="font-bold text-gray-900">
        {title}
      </p>

      <p variant="body2" className="text-gray-500 leading-relaxed">
        {comment}
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
