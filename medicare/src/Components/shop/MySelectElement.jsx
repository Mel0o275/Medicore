import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import useSearchStore from "../../Store/useSearchStore";

export default function MySelectElement() {
  const sort = useSearchStore((state) => state.sort);
  const setSort = useSearchStore((state) => state.setSort);
  const handleChange = (e) => {
    setSort(e.target.value);
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
          shrink={true}
          sx={{
            color: "#00a297",
            "&.Mui-focused": { color: "#00a297" },
          }}
        >
          Sort
        </InputLabel>

        <NativeSelect
          id="sort-native"
          value={sort}
          onChange={handleChange}
          inputProps={{
            name: "sort",
            id: "uncontrolled-native",
          }}
        >
          <option value="">Default Sorting</option>
          <option value="-ratings">Sort By Average Rating</option>
          <option value="-createdAt">Sort By Latest</option>
          <option value="price">Sort By Price: Low-High</option>
          <option value="-price">Sort By Price: High-Low</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
