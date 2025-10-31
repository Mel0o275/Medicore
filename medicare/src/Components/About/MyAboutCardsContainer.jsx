import MyAboutCard from "./MyAboutCard";
import { aboutCards } from "../../Constants/NavPages";

function MyAboutCardsContainer() {
  return (
    <div className="flex gap-5 mx-8 md:mx-18 mb-14 flex-wrap md:flex-nowrap">
      {aboutCards.map((card, i) => (
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
