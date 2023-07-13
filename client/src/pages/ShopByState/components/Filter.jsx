import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(true);
  const [isDiscountFilterVisible, setIsDiscountFilterVisible] = useState(true);
  const [isAvailabilityFilterVisible, setIsAvailabilityFilterVisible] =
    useState(true);

  const togglePriceFilterVisibility = () => {
    setIsPriceFilterVisible(!isPriceFilterVisible);
  };

  const toggleDiscountFilterVisibility = () => {
    setIsDiscountFilterVisible(!isDiscountFilterVisible);
  };

  const toggleAvailabilityFilterVisibility = () => {
    setIsAvailabilityFilterVisible(!isAvailabilityFilterVisible);
  };
  return (
    <div className="font-poppins">
      {/* Price Filter */}
      <div
        className="mt-10 flex flex-row justify-between font-poppins cursor-pointer"
        onClick={togglePriceFilterVisibility}
      >
        <p className="text-xl">Product Price</p>
        <FontAwesomeIcon className="mt-1" icon={faMinus} />
      </div>
      <div
        className={`flex flex-col mt-2 transition-all ${
          isPriceFilterVisible ? "max-h-full" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹500 - ₹1000 </label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹1000 - ₹2000</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹1000 - ₹2000</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">Over ₹2000 </label>
        </div>
      </div>
      {/* Discount Filter */}
      <div
        className="mt-10 flex flex-row justify-between font-poppins cursor-pointer"
        onClick={toggleDiscountFilterVisibility}
      >
        <p className="text-xl">Discount</p>
        <FontAwesomeIcon className="mt-1" icon={faMinus} />
      </div>
      <div
        className={`flex flex-col mt-2 transition-all ${
          isDiscountFilterVisible ? "max-h-full" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">10% off or more</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">25% off or more</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">35% off or more</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">50% off or more</label>
        </div>
      </div>
      {/* Availability Filter */}
      <div
        className="mt-10 flex flex-row justify-between font-poppins cursor-pointer"
        onClick={toggleAvailabilityFilterVisibility}
      >
        <p className="text-xl">Availability</p>
        <FontAwesomeIcon className="mt-1" icon={faMinus} />
      </div>
      <div
        className={`flex flex-col mt-2 transition-all ${
          isAvailabilityFilterVisible ? "max-h-full" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹500 - ₹1000 </label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹1000 - ₹2000</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">₹1000 - ₹2000</label>
        </div>
        <div className="mt-5">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label className="ml-3">Over ₹2000 </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
