import BestSellers1 from "../../../assets/best-sellers-1.png";
import BestSellers2 from "../../../assets/best-sellers-2.png";
import BestSellers3 from "../../../assets/best-sellers-3.png";

const Gallery = () => {
  return (
    <div className="flex flex-col sm:flex-row overflow-x-auto">
      <div className="flex sm:w-1/3">
        <img src={BestSellers1} alt="Image 1" className="w-full" />
      </div>
      <div className="flex sm:w-1/3">
        <img src={BestSellers2} alt="Image 2" className="w-full" />
      </div>
      <div className="flex sm:w-1/3">
        <img src={BestSellers3} alt="Image 3" className="w-full" />
      </div>
    </div>
  );
};

export default Gallery;
