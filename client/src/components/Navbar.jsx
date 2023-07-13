import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
// Import ui components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import EnajoriLogo from "../assets/enajori_logo.png";

import Cart from "./Cart";

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
  const dropdownRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    console.log("Attaching event listener");
    console.log("Dropdown Ref:", dropdownRef.current);

    const handleOutsideClick = (event) => {
      console.log("Event target:", event.target);
      console.log("Is Menu open:", isMenuOpen);
      if (isMenuOpen && dropdownRef.current) {
        // setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("Removing event listener");

      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const [isNavbarTransparent, setIsNavbarTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsNavbarTransparent(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    console.log("Toggled Cart");
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <nav className="bg-color1 shadow-xl h-20 w-full">
        {/* <nav
        className={`fixed  top-0 left-0 right-0 z-50 p-4 transition-all duration-500 ${
          isNavbarTransparent ? "bg-color1 bg-opacity-50" : "bg-color1"
        }`}
      > */}
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 pt-5">
          {/* Hamburger dropdown button */}
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

          {/* Logo Branding */}
          <a href="/" className="flex items-center">
            <img src={EnajoriLogo} className="h-10 mr-3" alt="Enajori Logo" />
            <span className="self-center text-2xl font-medium font-poppins whitespace-nowrap text-white ">
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
                    page === "HOME"
                      ? `/`
                      : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                  }
                >
                  {page}
                </Link>
              );
            })}
          </div>

          {/* Search , Profile and cart*/}
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
              onClick={toggleCart}
            />
          </div>
        </div>
      </nav>
      {console.log("cart is open:", isCartOpen)}
      {isCartOpen && <Cart />}
      {/* Dropdown menu */}
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}
        >
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
                  onClick={() => setIsMenuOpen(false)}
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
