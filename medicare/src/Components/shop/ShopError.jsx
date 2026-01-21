import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Typography, Button, Box } from "@mui/material";
import useTheme from "../../Store/useTheme";

function ShopError({ error }) {
  const theme = useTheme();

  const mainColor =
    theme.mode !== "dark" ? theme.primaryText : theme.primaryColor;

  return (
    <section className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center p-6 rounded-lg mx-8 md:mx-24">
      {/* Icon */}
      <Box
        sx={{
          color: mainColor,
          fontSize: "4rem",
          opacity: 0.8,
        }}
      >
        <MdOutlineReportGmailerrorred />
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: mainColor,
        }}
      >
        Oops! Something went wrong.
      </Typography>

      {/* Message */}
      <Typography
        variant="body1"
        sx={{
          color:
            theme.mode !== "dark" ? theme.secondaryText : theme.primaryText,
          fontSize: "1.1rem",
        }}
      >
        {error?.response?.data?.message ||
          "Unable to load the data. Please try again later."}
      </Typography>

      {/* Button */}
      <Button
        onClick={() => window.location.reload()}
        variant="contained"
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: "6px",
          backgroundColor: mainColor,
          color: theme.mode !== "dark" ? "#fff" : theme.secondaryText,
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: mainColor,
            opacity: 0.85,
          },
        }}
      >
        Retry
      </Button>
    </section>
  );
}

export default ShopError;
