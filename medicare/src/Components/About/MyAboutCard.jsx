import { Box } from "@mui/material";

function MyAboutCard({ element, title, desc }) {
  return (
    <Box className=" text-center shadow-lg p-8 rounded-md">
      {element}
      <h3 className="py-4 font-bold text-lg">{title}</h3>
      <p className=" font-semibold">{desc}</p>
    </Box>
  );
}

export default MyAboutCard;
