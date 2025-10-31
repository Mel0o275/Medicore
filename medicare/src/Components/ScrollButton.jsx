import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
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
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-4 rounded-full text-[#00a297]  text-lg shadow-md hover:shadow-lg border-2 border-[#00a297] bg-stone-100 hover:bg-stone-200 transition-all duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default ScrollButton;
