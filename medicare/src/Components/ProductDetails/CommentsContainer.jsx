import MyComment from "./MyComment";

function CommentsContainer({ reviews, userId }) {
  return (
    <div className="flex flex-col gap-2 h-[57.5vh] overflow-y-auto hide-scrollbar">
      {reviews.map((review, i) => (
        <MyComment review={review} key={i} userId={userId} />
      ))}
    </div>
  );
}

export default CommentsContainer;
