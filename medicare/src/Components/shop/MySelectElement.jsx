import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useSearchParams } from "react-router-dom";

export default function MySelectElement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "default";

  const handleChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (newSort === "default") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }

    params.set("page", 1);

    setSearchParams(params);
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
          <option value="-rating">Sort By Average Rating</option>
          <option value="-createdAt">Sort By Latest</option>
          <option value="price">Sort By Price: Low-High</option>
          <option value="-price">Sort By Price: High-Low</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
