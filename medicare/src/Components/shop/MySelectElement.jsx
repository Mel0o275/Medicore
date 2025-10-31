import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export default function MySelectElement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "default";
  const updateUrl = (newSearchParams) => {
    const cleanParams = decodeURIComponent(newSearchParams.toString());
    const newUrl = `${location.pathname}?${cleanParams}`;
    setSearchParams(newSearchParams);
    navigate(newUrl, { replace: true });
  };
  const handleChange = (e) => {
    const newSort = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSort === "default") {
      newSearchParams.delete("sort");
    } else {
      newSearchParams.set("sort", newSort);
    }
    newSearchParams.set("page", 1);
    updateUrl(newSearchParams);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl
        fullWidth
        sx={{
          color: "#00a297",
          "& .MuiInputBase-root:hover": { color: "#00a297" },
          "& .MuiNativeSelect-icon": { color: "#00a297" },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#00a297",
          },
          "& .MuiInput-underline:after": { borderBottomColor: "#00a297" },
        }}
      >
        <InputLabel
          variant="standard"
          htmlFor="sort-native"
          sx={{
            color: "#00a297",
            "&.Mui-focused": { color: "#00a297" },
          }}
        >
          Sort
        </InputLabel>

        <NativeSelect
          id="sort-native"
          value={sortValue}
          onChange={handleChange}
          inputProps={{
            name: "sort",
            id: "uncontrolled-native",
          }}
        >
          <option value="default">Default Sorting</option>
          <option value="rating-desc">Sort By Average Rating</option>
          <option value="latest">Sort By Latest</option>
          <option value="price-asc">Sort By Price: Low-High</option>
          <option value="price-desc">Sort By Price: High-Low</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
