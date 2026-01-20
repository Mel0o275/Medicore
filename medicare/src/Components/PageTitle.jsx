import useTheme from "../Store/useTheme";
import MyBreadCrumbs from "./MyBreadCrumbs";

function PageTitle({ title }) {
  const theme = useTheme();
  return (
    <div className="flex flex-col justify-center items-center text-center  py-8 px-4">
      <MyBreadCrumbs />
      <h1
        className="font-bold text-4xl"
        style={{
          color: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
        }}
      >
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
