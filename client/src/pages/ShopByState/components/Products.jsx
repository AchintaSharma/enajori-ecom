import { useState } from "react";
import Image1 from "../../../assets/best-sellers-1.png";
import Image2 from "../../../assets/best-sellers-2.png";
import Image3 from "../../../assets/best-sellers-3.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const products = [
  {
    image: Image1,
    name: "Cheap Necklace",
    price: "₹300",
    styles: "rounded-full",
  },
  {
    image: Image2,
    name: "Cheaper Necklace",
    price: "₹200",
    styles: "rounded-xl",
  },
  {
    image: Image3,
    name: "Cheapest Necklace",
    price: "₹100",
    styles: "rounded-xl",
  },
  {
    image: Image2,
    name: "Cheaper Necklace",
    price: "₹200",
    styles: "rounded-xl",
  },
  {
    image: Image1,
    name: "Cheap Necklace",
    price: "₹300",
    styles: "rounded-full",
  },
  {
    image: Image3,
    name: "Cheapest Necklace",
    price: "₹100",
    styles: "rounded-xl",
  },
  {
    image: Image2,
    name: "Cheaper Necklace",
    price: "₹200",
    styles: "rounded-xl",
  },
  {
    image: Image1,
    name: "Cheap Necklace",
    price: "₹300",
    styles: "rounded-full",
  },
  {
    image: Image1,
    name: "Cheap Necklace",
    price: "₹300",
    styles: "rounded-full",
  },
  {
    image: Image2,
    name: "Cheaper Necklace",
    price: "₹200",
    styles: "rounded-xl",
  },
  {
    image: Image3,
    name: "Cheapest Necklace",
    price: "₹100",
    styles: "rounded-xl",
  },
  {
    image: Image2,
    name: "Cheaper Necklace",
    price: "₹200",
    styles: "rounded-xl",
  },
  {
    image: Image1,
    name: "Cheap Necklace",
    price: "₹300",
    styles: "rounded-full",
  },
  {
    image: Image3,
    name: "Cheapest Necklace",
    price: "₹100",
    styles: "rounded-xl",
  },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-16 m-20">
        {currentItems.map((product, index) => (
          <div
            className={`${index === 6 ? "col-span-8" : "col-span-4"}`}
            key={index}
          >
            <img
              className={`h-96 ${
                index % itemsPerPage === 0 || index === 4 || index === 7
                  ? "rounded-full"
                  : "rounded-xl"
              } w-full ${index === 6 ? "object-cover" : ""} `}
              src={product.image}
              alt="best-sellers1"
            />
            <div className="flex justify-between">
              <p className="mt-5 font-poppins text-xl font-medium">
                {product.name}
              </p>
              <p className="mt-5 font-poppins text-xl font-medium">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center  bottom-0 left-0 right-0 mb-10">
        <button onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faCaretLeft} className="pr-2" size="lg" />
        </button>
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
          (page) => (
            <button
              key={page}
              className="px-3"
              onClick={() => handlePageClick(page + 1)}
            >
              {page + 1}
            </button>
          )
        )}
        <button className="pl-2" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faCaretRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Products;
