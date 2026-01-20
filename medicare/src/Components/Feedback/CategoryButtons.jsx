import { useState } from "react";

import { FaDesktop, FaRegStar, FaTruck, FaLightbulb } from "react-icons/fa";
import useTheme from "../../Store/useTheme";

const categories = [
  { id: "website", title: "Website Feedback", icon: FaDesktop },
  { id: "product", title: "Product Review", icon: FaRegStar },
  { id: "delivery", title: "Delivery Experience", icon: FaTruck },
  { id: "other", title: "Other Suggestion", icon: FaLightbulb },
];

export default function CategoryButtons({ onSelectCategory }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (id) => {
    setSelected(id);
    onSelectCategory?.(id);
  };

  const theme = useTheme();

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(({ id, title, icon }) => {
          const Icon = icon;
          return (
            <button
              style={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                backgroundColor:
                  theme.mode !== "dark"
                    ? theme.primaryColor
                    : theme.secondaryText,
              }}
              key={id}
              onClick={() => handleClick(id)}
              className={`group flex flex-col items-center sm:flex-row sm:items-center w-full p-2 sm:p-4 rounded-lg shadow-sm  border transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md ${
                selected === id ? "ring-2 ring-main" : ""
              }`}
            >
              <div className="p-2 sm:p-3 rounded-md  mb-2 sm:mb-0 sm:mr-4">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8  transition-transform duration-200 group-hover:scale-110" />
              </div>
              <div className=" font-medium text-sm sm:text-base text-center sm:text-left">
                {title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
