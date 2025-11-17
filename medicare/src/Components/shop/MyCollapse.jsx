import { useState } from "react";
import MyRating from "../MyRating";
import { filterOptions } from "../../Constants/NavPages";
import useSearchStore from "../../Store/useSearchStore";

const MyCollapse = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const items = filterOptions[title] || [];
  const category = useSearchStore((state) => state.category);
  const brand = useSearchStore((state) => state.brand);
  const price = useSearchStore((state) => state.price);
  const setCategory = useSearchStore((state) => state.setCategory);
  const setBrand = useSearchStore((state) => state.setBrand);
  const setPrice = useSearchStore((state) => state.setPrice);

  const isMultiSelect = title === "Categories" || title === "Brands";
  const isPrice = title === "Price Filter";

  const activeValue =
    title === "Categories"
      ? category
      : title === "Brands"
      ? brand
      : title === "Price Filter"
      ? price
      : "";

  const handleCheckboxChange = (item) => {
    if (title === "Categories") {
      if (category.includes(item)) {
        setCategory(category.filter((c) => c !== item));
      } else {
        setCategory([...category, item]);
      }
    } else if (title === "Brands") {
      if (brand.includes(item)) {
        setBrand(brand.filter((b) => b !== item));
      } else {
        setBrand([...brand, item]);
      }
    }
  };

  const handleSingleSelect = (item) => {
    if (title === "Price Filter") {
      setPrice(price === item ? "" : item);
    }
  };

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
            {isMultiSelect &&
              items.map((item, i) => (
                <li key={i} className="flex gap-2 items-center group">
                  <input
                    type="checkbox"
                    id={item}
                    checked={activeValue.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    className="w-4 h-4 border border-gray-400 rounded-none group-hover:ring-1 transition-all duration-300 cursor-pointer accent-[#00a297]"
                  />
                  <label
                    htmlFor={item}
                    className="group-hover:text-[#00a297] transition-all duration-300 cursor-pointer"
                  >
                    {item}
                  </label>
                </li>
              ))}
            {isPrice &&
              items.map((item) => (
                <p
                  key={item}
                  onClick={() => handleSingleSelect(item)}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeValue === item
                      ? "text-[#00a297] font-semibold"
                      : "hover:text-[#00a297]"
                  }`}
                >
                  {item}
                </p>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCollapse;
