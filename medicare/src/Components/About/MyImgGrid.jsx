import img1 from "/about-page-01.jpg";
import img2 from "/about-page-02.jpg";
import img3 from "/about-page-03.jpg";
import img4 from "/about-page-04.jpg";
function MyImgGrid() {
  return (
    <div className="flex  flex-col  md:grid grid-cols-2 my-14 ">
      <div>
        <img src={img1} />
      </div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2 lg:gap-x-4.5">
        <img src={img2} className="col-span-2" />
        <img src={img3} />
        <img src={img4} />
      </div>
    </div>
  );
}

export default MyImgGrid;
