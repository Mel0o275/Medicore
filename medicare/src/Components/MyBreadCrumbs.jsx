import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation } from "react-router-dom";
import useTheme from "../Store/useTheme";

export default function MyBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const formatLabel = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const theme = useTheme();

  return (
    <div role="presentation" className="mb-4">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const label = formatLabel(value);

          return (
            <Typography
              key={index}
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
                fontWeight: isLast ? 600 : 500,
              }}
            >
              {label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
