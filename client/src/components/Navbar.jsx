import { useState } from "react";
import { Link } from "react-router-dom";

// Import ui components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import EnajoriLogo from "../assets/enajori_logo.png";

// list of pages for navigation bar
const pages = [
  "HOME",
  "SHOP BY STATE",
  "SHOP BY CATEGORY",
  "NEW ARRIVALS",
  "OUR STORY",
];

// Navbar functional component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-color1 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 ml-3 lg:hidden"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              icon={faBars}
              color="white"
              size="lg"
              className="h-5 lg:hidden"
            />
          </button>

          <a href="/" className="flex items-center">
            <img src={EnajoriLogo} className="h-10 mr-3" alt="Enajori Logo" />
            <span className="self-center text-2xl font-medium font-poppins whitespace-nowrap dark:text-white ">
              Enajori
            </span>
          </a>

          {/* Pages Links */}
          <div className="lg:flex items-center hidden">
            {pages.map((page) => {
              return (
                <Link
                  className="px-3 py-2 ml-3 text-sm font-[400] font-poppins text-white"
                  key={page}
                  to={
                    page === "Home"
                      ? `/`
                      : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                  }
                >
                  {page}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color="white"
              size="lg"
              className="mr-8 h-5"
            />
            <FontAwesomeIcon
              icon={faUser}
              color="white"
              size="lg"
              className="mr-8 h-5 lg:flex hidden"
            />
            <FontAwesomeIcon
              icon={faCartShopping}
              color="white"
              size="lg"
              className="h-5 mr-3"
            />
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        // <div className="bg-gray-100 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:hidden">
        <div className="bg-color2 lg:hidden">
          <ul className="font-medium flex flex-col p-4 bg-color2">
            {pages.map((page) => (
              <li key={page}>
                <Link
                  className="block py-2 pl-3 pr-4 rounded hover:bg-color3 text-white"
                  key={page}
                  to={
                    page === "HOME"
                      ? "/"
                      : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                  }
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
