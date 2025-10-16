import { createTheme } from "@mui/material/styles";
import useTheme from "../Store/useTheme";

export const buildMuiTheme = () => {
  const { primaryColor, secondaryColor, primaryText, secondaryText, mode } =
    useTheme.getState();

  return createTheme({
    palette: {
      //   mode: mode === "Light" ? "light" : "dark",

      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
      text: {
        primary: primaryText,
        secondary: secondaryText,
      },
    },
    typography: {
      fontFamily: [
        "Primary",
        "MerriweatherVariable",
        "PlayfairItalic",
        "PTSerifBold",
        "sans-serif",
      ].join(","),

      p: {
      
        color: primaryColor,
      },

      // العناوين الكبيرة
      h1: {
        fontFamily: "Primary",
        fontSize: "3rem",
        fontWeight: 700,
        color: primaryText,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: "MerriweatherVariable",
        fontSize: "2rem",
        fontWeight: 600,
        color: secondaryText,
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: "MerriweatherVariable",
        fontSize: "2rem",
        fontWeight: 600,
        color: secondaryText,
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: "PTSerifBold",
        fontSize: "1.75rem",
        fontWeight: 600,
        color: primaryText,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: "PTSerifBold",
        fontSize: "1rem",
        fontWeight: 600,
      },
      h6: {
        fontFamily: "PlayfairItalic",
        fontSize: "1.25rem",
        fontWeight: 500,
        color: secondaryText,
      },

      // النصوص العادية
      body1: {
        fontFamily: "PTSerifBold",
        fontSize: "1rem",
        color: primaryText,
        lineHeight: 1.8,
      },
      body2: {
        fontFamily: "PlayfairItalic",
        fontSize: "0.95rem",
        color: secondaryText,
        lineHeight: 1.7,
      },

      // النصوص الصغيرة أو الوصفية
      subtitle1: {
        fontFamily: "PlayfairItalic",
        fontSize: "0.9rem",
        color: secondaryText,
        fontStyle: "italic",
      },
      subtitle2: {
        fontFamily: "PlayfairItalic",
        fontSize: "0.85rem",
        color: secondaryText,
        fontStyle: "italic",
      },

      button: {
        fontFamily: "PTSerifBold",
        fontWeight: 700,
        textTransform: "none",
        fontSize: "1rem",
      },
      caption: {
        fontFamily: "PlayfairItalic",
        fontSize: "0.8rem",
        color: secondaryText,
      },
    },
  });
};
