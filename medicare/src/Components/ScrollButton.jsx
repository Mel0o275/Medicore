import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import useTheme from "../Store/useTheme";
import { Button } from "@mui/material";
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
     <Button
  onClick={scrollToTop}
  className="!fixed !bottom-6 !right-20 shadow-lg transition-all duration-300 z-50"
  sx={{
    backgroundColor:
      theme.mode !== "dark"
        ? theme.primaryText
        : theme.primaryColor,
    color: theme.mode !== "dark" ? "white" : "#0F172A",
    width: 48,
    height: 48,
    minWidth: 0,
    borderRadius: "50%",
    p: 0,
    "&:hover": {
      opacity: 0.9,
    },
  }}
>
  <FaArrowUp />
</Button>

      )}
    </>
  );
}

export default ScrollButton;
