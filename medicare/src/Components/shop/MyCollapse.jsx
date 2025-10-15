import { useState } from "react";
import MyRating from "../MyRating";

const filterOptions = {
  "Shop By Categories": [
    "Our Store",
    "Baby Care",
    "Beauty Care",
    "Health Care",
    "Personal Care",
    "Skin Care",
  ],
  Brands: [
    "Creative",
    "Design",
    "Gallery",
    "Golden",
    "Highlight",
    "Modern",
    "Nature",
    "Sparker",
  ],
  Highlight: [
    "All Products",
    "Best Seller",
    "New Arrivals",
    "Sale",
    "Hot Items",
  ],
  "Price Filter": ["All", "$0-$100", "$400-$500"],
};

const MyCollapse = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const items = filterOptions[title];

  return (
    <div className="border-stone-200 border rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 font-bold "
      >
        <span className="text-[#00a297]">{title}</span>
        <span className="font-bold text-xl cursor-pointer hover:text-[#00a297] transition-all duration-300">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white">
          <ul className="flex flex-col gap-4 p-4 pt-0">
            {items &&
              items.map((item, i) => (
                <li key={i} className="flex gap-2 items-center group">
                  {title !== "Highlight" && title !== "Price Filter" ? (
                    <>
                      <input
                        type="checkbox"
                        name={item}
                        id={item}
                        className="w-4 h-4 border border-gray-400 rounded-none group-hover:ring-1 transition-all duration-300 cursor-pointer  accent-[#00a297] "
                      />
                      <label
                        htmlFor={item}
                        className="group-hover:text-[#00a297] transition-all duration-300  cursor-pointer"
                      >
                        {item}
                      </label>
                    </>
                  ) : (
                    <p className="hover:text-[#00a297] transition-all duration-300 cursor-pointer">
                      {item}
                    </p>
                  )}
                </li>
              ))}
            {title === "Average Rating" &&
              [5, 4, 3, 2, 1].map((val, i) => <MyRating key={i} value={val} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCollapse;
