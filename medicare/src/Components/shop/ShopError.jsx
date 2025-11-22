import { MdOutlineReportGmailerrorred } from "react-icons/md";
function ShopError({ error }) {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center bg-stone-100/50 p-6 rounded-lg mx-8 md:mx-24">
      <MdOutlineReportGmailerrorred className="text-6xl text-[#00a29755]" />
      <h2 className="text-3xl font-bold text-[#00a29755]">
        Oops! Something went wrong.
      </h2>
      <p className="text-stone-600 text-lg">
        {error?.response?.data?.message ||
          "Unable to load the data. Please try again later."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-[#00a297] text-white rounded-md hover:bg-[#008377] transition"
      >
        Retry
      </button>
    </section>
  );
}

export default ShopError;
