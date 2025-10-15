import ProductCard from "./ProductCard";
import img1 from "/1.jpg";
import img2 from "/2.jpg";
import img3 from "/20.jpg";
import img4 from "/17.jpg";
import img5 from "/24.jpg";
function ProductsContainer() {
  const product = {
    id: 1,
    name: "Bella Baby Happy Diapers Large, 48 Count",
    brand: "Golden",
    discount: "-13%",
    priceRange: "$8 – $20",
    rating: 4,
    description: [
      "Tourniquet made of strong elastic strap with a simple plastic lock.",
      "One hand can implement the hemostatic device.",
      "Light weight, sleek, classy, solid.",
    ],
    images: {
      front: img1,
      back: img2,
    },
    relatedProducts: [
      {
        id: 1,
        name: "Omron HEM 7120 Fully Automatic",
        price: 20,
        stock: 5,
        img: img3,
      },
      {
        id: 2,
        name: "Easycare Big Display Digital Blood",
        price: 14.4,
        stock: 12,
        img: img4,
      },
      {
        id: 3,
        name: "Himalaya Baby Body Lotion 400 ml",
        price: 6.5,
        stock: 8,
        img: img5,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}

export default ProductsContainer;
