import { useState } from "react";
import MyRating from "../MyRating";
import { filterOptions, filterKeys } from "../../Constants/NavPages";
import { useNavigate, useLocation } from "react-router-dom";
const MyCollapse = ({ title, searchParams, setSearchParams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const items = filterOptions[title];
  const queryKey = filterKeys[title];

  const updateUrl = (newSearchParams) => {
    const cleanParams = decodeURIComponent(newSearchParams.toString());
    const newUrl = `${location.pathname}?${cleanParams}`;
    setSearchParams(newSearchParams);
    navigate(newUrl, { replace: true });
  };

  const handleCheckboxChange = (e, item) => {
    const value = item.toLowerCase().replace(/\s+/g, "-");
    const currentValue = searchParams.get(queryKey) || "";
    const currentValues = currentValue.split(",").filter((val) => Boolean(val));

    let newValues;
    if (e.target.checked) {
      newValues = currentValues.includes(value)
        ? currentValues
        : [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    const newSearchParams = new URLSearchParams(searchParams);
    if (newValues.length > 0) {
      newSearchParams.set(queryKey, newValues.join(","));
    } else {
      newSearchParams.delete(queryKey);
    }

    updateUrl(newSearchParams);
  };

  const handleClickFilter = (item) => {
    const value = item.toLowerCase().replace(/\s+/g, "-");
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(queryKey) === value) {
      newSearchParams.delete(queryKey);
    } else {
      newSearchParams.set(queryKey, value);
    }

    updateUrl(newSearchParams);
  };

  const handleRatingClick = (val) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get("rating") === val.toString()) {
      newSearchParams.delete("rating");
    } else {
      newSearchParams.set("rating", val);
    }
    updateUrl(newSearchParams);
  };

  const activeValue = searchParams.get(queryKey);

  return (
    <div className="border-stone-200 border rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 font-bold"
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
              items.map((item, i) => {
                const value = item.toLowerCase().replace(/\s+/g, "-");
                const currentValue = searchParams.get(queryKey) || "";
                const isChecked = currentValue.split(",").includes(value);
                const isActive = activeValue === value;

                return (
                  <li key={i} className="flex gap-2 items-center group">
                    {title === "Categories" || title === "Brands" ? (
                      <>
                        <input
                          type="checkbox"
                          name={item}
                          id={item}
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(e, item)}
                          className="w-4 h-4 border border-gray-400 rounded-none group-hover:ring-1 transition-all duration-300 cursor-pointer accent-[#00a297]"
                        />
                        <label
                          htmlFor={item}
                          className="group-hover:text-[#00a297] transition-all duration-300 cursor-pointer"
                        >
                          {item}
                        </label>
                      </>
                    ) : (
                      <p
                        onClick={() => handleClickFilter(item)}
                        className={`cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "text-[#00a297] font-semibold"
                            : "hover:text-[#00a297]"
                        }`}
                      >
                        {item}
                      </p>
                    )}
                  </li>
                );
              })}

            {title === "Average Rating" &&
              [5, 4, 3, 2, 1].map((val) => {
                const active = searchParams.get("rating") === val.toString();
                return (
                  <div
                    key={val}
                    onClick={() => handleRatingClick(val)}
                    className={`cursor-pointer hover:scale-105 transition-all ${
                      active ? "text-[#00a297] font-semibold" : ""
                    }`}
                  >
                    <MyRating value={val} />
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCollapse;
