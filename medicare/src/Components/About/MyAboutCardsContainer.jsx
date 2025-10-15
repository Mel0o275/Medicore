import {
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import MyAboutCard from "./MyAboutCard";

const cards = [
  {
    icon: <AiOutlineCheckCircle className="text-5xl mx-auto text-[#00a297]" />,
    title: "Submit a task",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: (
      <AiOutlineMessage
        className="text-5xl mx-auto text-[#00a297]"
        sx={{ fontSize: "3em", color: "#00a297" }}
      />
    ),
    title: "Send message",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: <AiOutlineUser className="text-5xl mx-auto text-[#00a297]" />,
    title: "Trusted experience",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
];

function MyAboutCardsContainer() {
  return (
    <div className="flex gap-5 mx-8 md:mx-18 mb-14 flex-wrap md:flex-nowrap">
      {cards.map((card, i) => (
        <MyAboutCard
          key={i}
          element={card.icon}
          title={card.title}
          desc={card.desc}
        />
      ))}
    </div>
  );
}

export default MyAboutCardsContainer;
