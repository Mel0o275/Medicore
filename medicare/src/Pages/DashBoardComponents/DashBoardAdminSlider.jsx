/* --------------------------- MUI ---------------------------- */
import { Box, Typography, Avatar, useTheme } from "@mui/material";

import useAuthStore from "../../Store/useAuthStore";
import { useUser } from "../../Hooks/reactUser/useUserSelected";
export function AdminSlider() {
  const theme = useTheme();
  const userId = useAuthStore((state) => state.user)?.data?.id; 


const {data : user} = useUser(userId); 

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
        {user?.firstName} {user?.secondName} 
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Administrator
      </Typography>
    </Box>
  );
}
