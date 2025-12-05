import { MdOutlineAutorenew } from "react-icons/md";

function ShopLoading() {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center  p-6 rounded-lg mx-8 md:mx-24">
      <MdOutlineAutorenew className="text-6xl text-[#00a297cc] animate-spin" />
      <h2 className="text-3xl font-bold text-[#00a297cc]">Loading...</h2>
    </section>
  );
}

export default ShopLoading;
