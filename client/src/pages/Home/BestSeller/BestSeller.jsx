import Image1 from "../../../assets/best-sellers-1.png";
import Image2 from "../../../assets/best-sellers-2.png";
import Image3 from "../../../assets/best-sellers-3.png";

const BestSeller = () => {
  return (
    <>
      <div className="flex flex-1 justify-center text-center text-6xl tracking-normal font-gloock mt-24">
        <p>Best Sellers</p>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-20 m-20 mt-32 ">
        <div className="col-span-4">
          <img className="rounded-full" src={Image1} alt="best-sellers1" />
          <div className="flex justify-between">
            <p className="mt-5 font-poppins text-xl font-medium">
              Cheap Necklace
            </p>
            <p className="mt-5 font-poppins text-xl font-medium">Rs 300</p>
          </div>
        </div>
        <div className="col-span-4">
          <img className="rounded-xl" src={Image2} alt="best-sellers1" />
          <div className="flex justify-between">
            <p className="mt-5 font-poppins text-xl font-medium">
              Cheaper Necklace
            </p>
            <p className="mt-5 font-poppins text-xl font-medium">Rs 200</p>
          </div>
        </div>
        <div className="col-span-4">
          <img className="rounded-xl" src={Image3} alt="best-sellers1" />
          <div className="flex justify-between">
            <p className="mt-5 font-poppins text-xl font-medium">
              Cheapest Necklace
            </p>
            <p className="mt-5 font-poppins text-xl font-medium">Rs 100</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
