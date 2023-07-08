import EnajoriLogo from "../assets/enajori_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-color1 py-8 mt-3 md:mt-5 lg:mt-16">
      <div className="mx-20">
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center mb-4 ">
            <img src={EnajoriLogo} alt="Enajori Logo" className="h-10 mr-3" />
            <span className="self-center text-2xl font-medium font-poppins whitespace-nowrap text-white">
              Enajori
            </span>
          </div>
        </div>

        {/* Footer container for md and lg screens*/}
        <div className="hidden container md:grid grid-cols-12 gap-4">
          {/* Branding, social handle and office address */}
          <div className="col-span-4">
            {/* Branding */}

            {/* social handle */}
            <div className="flex mb-4">
              <a href="#" className="mr-10">
                <FontAwesomeIcon size="lg" color="#EDE5E0" icon={faFacebook} />
              </a>
              <a href="#" className="mr-10">
                <FontAwesomeIcon size="lg" color="#EDE5E0" icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon size="lg" color="#EDE5E0" icon={faTwitter} />
              </a>
            </div>
            {/* 1.C */}
            <p className="text-white mb-4">Office Address (Lorem Ipsum)</p>
            {/* 1.D */}
            <p className="text-white">&copy; Enajori</p>
          </div>

          {/* Second Column */}
          <div className="col-span-3 ">
            <ul className="text-color5">
              <li className="mb-2">Customer Service</li>
              <li className="mb-2">Payment</li>
              <li className="mb-2">Shipping</li>
              <li className="mb-2">Terms and Conditions</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>

          {/* Third Column */}
          <div className=" md:col col-span-5 ">
            <div className="text-color5 mb-4">Get in touch!</div>
            <form>
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border border-color4 placeholder-gray-500 mb-4 p-3 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent placeholder-gray-500 mb-4 p-3 w-full border border-color4"
              />

              <input
                type="text"
                placeholder="How can we help?"
                className={`h-32 w-full p-3 text-white bg-transparent border border-color4`}

                // className="bg-white placeholder-gray-500 mb-4 p-2 rounded h-24 resize-none w-full border border-color4 focus:border-color4"
              />
            </form>
          </div>
        </div>
        {/* Footer container for sm screen */}
        <div className="md:hidden">
          <div className="flex justify-center flex-1">
            <div className="flex mb-4">
              <a href="#" className="mr-10">
                <FontAwesomeIcon size="xl" color="#EDE5E0" icon={faFacebook} />{" "}
              </a>
              <a href="#" className="mr-10">
                <FontAwesomeIcon size="xl" color="#EDE5E0" icon={faInstagram} />{" "}
              </a>
              <a href="#">
                <FontAwesomeIcon size="xl" color="#EDE5E0" icon={faTwitter} />{" "}
              </a>
            </div>
          </div>

          <div className="text-color5 mb-4 mt-4">Get in touch!</div>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent border border-color4 placeholder-gray-500 mb-8 p-3 w-full text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-color4 placeholder-gray-500 mb-8 p-3 w-full text-white"
            />

            <input
              type="text"
              placeholder="How can we help?"
              className={`bg-transparent border border-color4 h-32 w-full p-3 text-white `}

              // className="bg-white placeholder-gray-500 mb-4 p-2 rounded h-24 resize-none w-full border border-color4 focus:border-color4"
            />
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
