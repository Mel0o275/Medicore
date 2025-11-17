import MyBreadCrumbs from "./MyBreadCrumbs";

function PageTitle({ title }) {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-stone-200 py-8 ">
      <MyBreadCrumbs />
      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  );
}

export default PageTitle;
