import MyComment from "./MyComment";

function CommentsContainer() {
  return (
    <div className="flex flex-col gap-2 h-[45vh] overflow-y-auto hide-scrollbar">
      <MyComment />
      <MyComment />
      <MyComment />
      <MyComment />
    </div>
  );
}

export default CommentsContainer;
