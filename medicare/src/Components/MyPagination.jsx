import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a297",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#00a297",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#009084",
            },
          },
        },
      },
    },
  },
});

export default function MyPagination({ count, page, onChange }) {
  return (
    <div className="self-center">
      <ThemeProvider theme={theme}>
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
