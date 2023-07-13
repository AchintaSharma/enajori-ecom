import Filter from "./components/Filter";
import Products from "./components/Products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const ShopByState = () => {
  return (
    <div className="mx-10">
      <div className="mt-10 flex font-poppins text-color7">
        Home / Shop By State
      </div>
      <div className="flex flex-row mt-12 justify-between font-poppins">
        <p className="text-2xl">Filters</p>
        <p className="text-4xl">SHOP BY STATE - ASSAM</p>
        <div className="flex flex-row ">
          <p className="text-2xl">Sort By</p>
          <FontAwesomeIcon className="ml-3 mt-2" size="" icon={faCaretDown} />
        </div>
      </div>
      <hr className="mt-6 border-1 border-color2"></hr>
      <div className="flex">
        <div className="w-1/5">
          <Filter />
        </div>
        <div className="w-4/5">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default ShopByState;
