/* --------------------------- MUI ---------------------------- */
import { Box, Typography, Avatar, useTheme } from "@mui/material";

export function AdminSlider() {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          margin: "0 auto 16px",
          border: `3px solid ${theme.palette.primary.main}`,
        }}
        src="/static/images/avatar/1.jpg"
        alt="Admin Avatar"
      >
        A
      </Avatar>
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        John Doe
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Administrator
      </Typography>
    </Box>
  );
}
