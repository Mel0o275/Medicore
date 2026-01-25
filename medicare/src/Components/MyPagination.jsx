import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useTheme from "../Store/useTheme";

export default function MyPagination({ count, page, onChange }) {
  const appTheme = useTheme();

  const mainColor =
    appTheme.mode !== "dark" ? appTheme.primaryText : appTheme.primaryColor;

  const paginationTheme = createTheme({
    palette: {
      primary: {
        main: mainColor,
      },
    },
   components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          transition: "all 0.3s",
          // Color for unselected pages
          color: appTheme.mode === "dark" ? "#fff" : mainColor,
          "&:hover": {
            backgroundColor: mainColor,
            color: "#fff",
            opacity: 0.85,
          },
          "&.Mui-selected": {
            backgroundColor: mainColor,
            color: "#fff",
            "&:hover": {
              backgroundColor: mainColor,
              opacity: 0.9,
            },
          },
        }}}}
  });
if (count<=1) return;
  return (
    <div className="self-center">
      <ThemeProvider theme={paginationTheme}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={page}
            onChange={onChange}
            color="primary"
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
}
