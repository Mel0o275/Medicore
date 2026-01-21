import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import useSearchStore from "../../Store/useSearchStore";
import useTheme from "../../Store/useTheme";

export default function MySelectElement() {
  const theme = useTheme();

  const sort = useSearchStore((state) => state.sort);
  const setSort = useSearchStore((state) => state.setSort);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  const dynamicColor =
    theme.mode !== "dark" ? theme.primaryText : theme.primaryColor;

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl
        fullWidth
        variant="standard"
        sx={{
          "& .MuiInputBase-root": {
            color: dynamicColor,
            transition: "all 0.3s",
          },

          "& .MuiInputBase-root:hover": {
            color: dynamicColor,
          },

          "& .MuiNativeSelect-icon": {
            color: dynamicColor,
          },

          "& .MuiInput-underline:before": {
            borderBottomColor: dynamicColor,
          },

          "& .MuiInput-underline:hover:before": {
            borderBottomColor: dynamicColor,
          },

          "& .MuiInput-underline:after": {
            borderBottomColor: dynamicColor,
          },
        }}
      >
        <InputLabel
          htmlFor="sort-native"
          shrink
          sx={{
            color: dynamicColor,
            transition: "all 0.3s",
            "&.Mui-focused": {
              color: dynamicColor,
            },
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
          }}
          sx={{
            "& option": {
              color: theme.primaryText,
              backgroundColor:
                theme.mode !== "dark" ? "#fff" : theme.secondaryText,
            },
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
