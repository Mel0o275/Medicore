import { MdOutlineAutorenew } from "react-icons/md";
import { Typography, Box } from "@mui/material";
import useTheme from "../../Store/useTheme";

function ShopLoading() {
  const theme = useTheme();

  const mainColor =
    theme.mode !== "dark" ? theme.primaryText : theme.primaryColor;

  return (
    <section className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center p-6 rounded-lg mx-8 md:mx-24">
      {/* Spinner */}
      <Box
        sx={{
          fontSize: "4rem",
          color: mainColor,
          opacity: 0.8,
          animation: "spin 1s linear infinite",
        }}
      >
        <MdOutlineAutorenew />
      </Box>

      {/* Text */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: mainColor,
        }}
      >
        Loading...
      </Typography>

      {/* Keyframes */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </section>
  );
}

export default ShopLoading;
