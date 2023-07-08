import { useState, useEffect } from "react";
import { ReactComponent as ArunachalPradesh } from "../../../assets/ArunachalPradesh.svg";
import { ReactComponent as Assam } from "../../../assets/Assam.svg";
import { ReactComponent as Nagaland } from "../../../assets/Nagaland.svg";
import { ReactComponent as Manipur } from "../../../assets/Manipur.svg";
import { ReactComponent as Meghalaya } from "../../../assets/Meghalaya.svg";
import { ReactComponent as Tripura } from "../../../assets/Tripura.svg";
import { ReactComponent as Mizoram } from "../../../assets/Mizoram.svg";
// import ArunachalPradesh from "./components/ArunachalPradesh";

const Map = () => {
  const stateColorOnHover = "brown";
  const stateColor = "white";

  // Determine view box size based on screen size
  const getViewBoxSize = () => {
    if (screenWidth <= 767) {
      return {
        x: 1200,
        y: 1250,
      };
    } else {
      return {
        x: 2200,
        y: 1350,
      };
    }
  };

  // Determine position of states based on screen size
  const getPositions = () => {
    if (screenWidth <= 767) {
      return {
        AR: { x: 350, y: 80 },
        AS: { x: 100, y: 282 },
        NL: { x: 580, y: 414 },
        MN: { x: 532, y: 600 },
        ML: { x: 120, y: 545 },
        TR: { x: 294, y: 758 },
        MZ: { x: 438, y: 766 },
      };
    } else {
      return {
        AR: { x: 1200, y: 80 },
        AS: { x: 950, y: 282 },
        NL: { x: 1430, y: 414 },
        MN: { x: 1382, y: 600 },
        ML: { x: 970, y: 545 },
        TR: { x: 1144, y: 758 },
        MZ: { x: 1288, y: 766 },
      };
    }
  };

  const [stateName, setStateName] = useState("North East");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [viewBoxSize, setViewBoxSize] = useState(getViewBoxSize());
  const [positions, setPositions] = useState(getPositions());

  const [arunachalHover, setArunachalHover] = useState(false);
  const [assamHover, setAssamHover] = useState(false);
  const [nagalandHover, setNagalandHover] = useState(false);
  const [manipurHover, setManipurHover] = useState(false);
  const [meghalayaHover, setMeghalayaHover] = useState(false);
  const [tripuraHover, setTripuraHover] = useState(false);
  const [mizoramHover, setMizoramHover] = useState(false);

  // Add event listener for resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set view box size and positions based on screen size
  useEffect(() => {
    setViewBoxSize(getViewBoxSize());
    setPositions(getPositions());
  }, [screenWidth]);

  // Handler for state hover
  const handleStateHover = (name) => {
    setStateName(name);
  };

  return (
    <>
      <svg
        className="w-full bg-color2"
        viewBox={`0 0 ${viewBoxSize.x} ${viewBoxSize.y}`}
      >
        <g transform={`translate(${positions.AR.x}, ${positions.AR.y})`}>
          <ArunachalPradesh
            fill={arunachalHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Arunachal Pradesh");
              setArunachalHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setArunachalHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.AS.x}, ${positions.AS.y})`}>
          <Assam
            // fill="yellow"
            fill={assamHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Assam");
              setAssamHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setAssamHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.NL.x}, ${positions.NL.y})`}>
          <Nagaland
            fill={nagalandHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Nagaland");
              setNagalandHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setNagalandHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.ML.x}, ${positions.ML.y})`}>
          <Meghalaya
            fill={meghalayaHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Meghalaya");
              setMeghalayaHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setMeghalayaHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.MN.x}, ${positions.MN.y})`}>
          <Manipur
            fill={manipurHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Manipur");
              setManipurHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setManipurHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.TR.x}, ${positions.TR.y})`}>
          <Tripura
            fill={tripuraHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Tripura");
              setTripuraHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setTripuraHover(false);
            }}
          />
        </g>
        <g transform={`translate(${positions.MZ.x}, ${positions.MZ.y})`}>
          <Mizoram
            fill={mizoramHover ? stateColorOnHover : stateColor}
            className="hover:cursor-pointer"
            onMouseEnter={() => {
              handleStateHover("Mizoram");
              setMizoramHover(true);
            }}
            onMouseLeave={() => {
              handleStateHover("North East");
              setMizoramHover(false);
            }}
          />
        </g>
      </svg>
      <div className="mt-[-50px] sm:mt-[-60px] md:mt-[-280px] ml-8 md:ml-16 lg:ml-24 text-color4">
        <p className="font-gloock text-2xl sm:text-3xl md:text-3xl">
          {stateName}
        </p>
        <p className="hidden md:block w-3/12 md:w-4/12 text-color4 mt-5 text-md lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          veritatis earum iste ex illo.
        </p>
      </div>
      {/* <div className="bg-color2 md:hidden">
        <p className="font-gloock text-4xl text-color4 ">{stateName}</p>
      </div> */}
    </>
  );
};

export default Map;
