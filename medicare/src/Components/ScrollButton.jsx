import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import useTheme from "../Store/useTheme";
function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const theme = useTheme();
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-40 p-4 rounded-full  text-lg shadow-lg hover:shadow-lg border-2  transition-all duration-300 z-50"
          style={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            backgroundColor:
              theme.mode !== "dark" ? theme.primaryColor : theme.secondaryText,
          }}
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default ScrollButton;
