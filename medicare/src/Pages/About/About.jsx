import MyAccordion from "../../components/About/MyAccordion";
import MyTab from "../../components/Tab/MyTab";
import PageTitle from "../../components/PageTitle";
import img7 from "/about-page-07.jpg";
import MyImgGrid from "../../components/About/MyImgGrid";
import MyAboutCardsContainer from "../../components/About/MyAboutCardsContainer";
import { NavLink } from "react-router-dom";
import ScrollButton from "../../components/ScrollButton";
import { stats } from "../../Constants/NavPages";
import AnimatedNumber from "../../Components/About/AnimatedNumber";
function splitValue(value) {
  const number = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  return { number, suffix };
}

function About() {
  return (
    <section className="bg-stone-100/50 pb-14">
      <ScrollButton />
      <PageTitle title="About Us" />
      <div className="mx-8 md:mx-24 mt-14">
        <MyTab page="about" />
        <MyImgGrid />
      </div>

      <div className="bg-stone-200 mb-14">
        <section className="mx-8 md:mx-24 flex flex-col md:flex-row justify-between items-center py-4 gap-10">
          <div className="basis-[50%] flex flex-col gap-5">
            <h1 className="text-4xl font-bold mb-4">
              Inspiration, innovation,
              <span className="block">and opportunities.</span>
            </h1>
            <p className="text-stone-500 font-semibold mb-4">
              Many Desktop Publishing Packages And Web Page Editors Now Use
              Lorem Ipsum As Their Default Model Text.
            </p>
            <MyAccordion />
          </div>
          <div className="basis-[50%]">
            <img src={img7} alt="About illustration" className="w-full" />
          </div>
        </section>
      </div>

      <div className="mx-8 md:mx-24">
        <MyAboutCardsContainer />
      </div>

      <section className="bg-[url('/about-page-06.jpg')] bg-cover bg-fixed mb-14 h-[40vh]">
        <div className="mx-8 md:mx-32 flex justify-center md:justify-between items-center h-full text-center text-white flex-wrap">
          {stats.map((item, idx) => {
            const { number, suffix } = splitValue(item.value);
            return (
              <div key={idx} className="md:basis-0 basis-[35%]">
                <span className="text-4xl font-bold">
                  <AnimatedNumber to={number} suffix={suffix} />
                </span>
                <p className="text-lg whitespace-nowrap">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="text-center mx-8 md:mx-24 flex justify-center items-center flex-col">
        <span className="text-stone-500">Contact us</span>
        <h1 className="text-3xl font-bold py-2">About us info</h1>
        <p className="w-full md:w-[50%] text-stone-500 pt-2 pb-10">
          It is a long-established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using ‘Content here’.
        </p>
        <NavLink to="/contact">
          <button className="font-semibold rounded-md px-4 py-2 text-white bg-[#00a297] cursor-pointer">
            CLICK HERE TO CONTACT US
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default About;
