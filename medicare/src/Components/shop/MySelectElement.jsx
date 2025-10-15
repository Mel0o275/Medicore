import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function MySelectElement() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        sx={{
          color: "#00a297",
          "& .MuiInputBase-root:hover": {
            color: "#00a297",
          },
          "& .MuiNativeSelect-icon": {
            color: "#00a297",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#00a297",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#00a297",
          },
        }}
      >
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-native"
          sx={{
            color: "#00a297",
            "&.Mui-focused": {
              color: "#00a297",
            },
          }}
        >
          Sort
        </InputLabel>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={1}>Default Sorting</option>
          <option value={2}>Sort By Popularity</option>
          <option value={3}>Sort By Average Rating</option>
          <option value={4}>Sort By Latest</option>
          <option value={5}>Sort By Price: Low-High</option>
          <option value={6}>Sort By Price: High-Low</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
