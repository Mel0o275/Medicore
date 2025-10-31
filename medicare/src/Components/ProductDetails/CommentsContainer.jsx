import MyComment from "./MyComment";

function CommentsContainer({ reviews }) {
  return (
    <div className="flex flex-col gap-2 h-[45vh] overflow-y-auto hide-scrollbar">
      {reviews.map((review, i) => (
        <MyComment review={review} key={i} />
      ))}
    </div>
  );
}

export default CommentsContainer;
