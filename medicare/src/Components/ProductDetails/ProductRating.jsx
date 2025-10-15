import { LinearProgress } from "@mui/material";
import { MdOutlineStar } from "react-icons/md";

function ProductRating() {
  const totalRatings = 1;
  const ratings = { 5: 0, 4: 1, 3: 0, 2: 0, 1: 0 };
  const average = 4.0;
  return (
    <div className="bg-gray-50 md:p-6 flex flex-col md:flex-row gap-6 items-center justify-center">
      <div className="text-center md:text-left w-full md:w-1/3">
        <h4 className="font-semibold">
          <span className="font-bold text-yellow-500">
            {average.toFixed(2)}{" "}
          </span>
          out of 5 stars
        </h4>
      </div>

      <div className="w-full md:w-2/3">
        {Object.keys(ratings)
          .sort((a, b) => b - a)
          .map((star) => {
            const count = ratings[star];
            const percentage = totalRatings ? (count / totalRatings) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 mb-1">
                <div className="flex items-center gap-1 w-12 justify-end">
                  <h3>{star}</h3>
                  <MdOutlineStar className="text-yellow-500" fontSize="small" />
                </div>
                <div className="flex-1">
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 12,
                      borderRadius: 5,
                      backgroundColor: "#f3f3f3",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#fbbf24",
                      },
                    }}
                  />
                </div>
                <p className="text-yellow-500 w-4 text-right">{count}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductRating;
