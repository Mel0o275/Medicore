import { useState } from "react";
import { Typography } from "@mui/material";
import MyRating from "../MyRating/MyRating";
import { filterOptions } from "../../Constants/NavPages";
import useSearchStore from "../../Store/useSearchStore";
import useTheme from "../../Store/useTheme";

const MyCollapse = ({ title }) => {
  const theme = useTheme();
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
      setCategory(
        category.includes(item)
          ? category.filter((c) => c !== item)
          : [...category, item],
      );
    }

    if (title === "Brands") {
      setBrand(
        brand.includes(item)
          ? brand.filter((b) => b !== item)
          : [...brand, item],
      );
    }
  };

  const handleSingleSelect = (item) => {
    if (title === "Price Filter") {
      setPrice(price === item ? "" : item);
    }
  };

  const dynamicColor =
    theme.mode !== "dark" ? theme.primaryText : theme.primaryColor;

  return (
    <div className="border-stone-200 border rounded-md overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 font-bold"
      >
        <Typography
          sx={{
            color: dynamicColor,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "20px",
            cursor: "pointer",
            transition: "all 0.3s",
            color: dynamicColor,
          }}
        >
          {isOpen ? "-" : "+"}
        </Typography>
      </button>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 pt-0">
          {/* Categories & Brands */}
          {isMultiSelect &&
            items.map((item) => (
              <li key={item} className="flex gap-2 items-center group">
                <input
                  type="checkbox"
                  id={item}
                  checked={activeValue.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="w-4 h-4 border border-gray-400 rounded-none cursor-pointer accent-[#00a297]"
                />

                <Typography
                  component="label"
                  htmlFor={item}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    color: dynamicColor,
                    "&:hover": {
                      color: dynamicColor,
                    },
                  }}
                >
                  {item}
                </Typography>
              </li>
            ))}

          {/* Price Filter */}
          {isPrice &&
            items.map((item) => (
              <Typography
                key={item}
                onClick={() => handleSingleSelect(item)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontWeight: activeValue === item ? 600 : 400,
                  color: activeValue === item ? dynamicColor : "inherit",
                  "&:hover": {
                    color: dynamicColor,
                  },
                }}
              >
                {item}
              </Typography>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCollapse;
