import { useState } from "react";
import { ReactComponent as ArunachalPradesh } from "../../assets/ArunachalPradesh.svg";
import { ReactComponent as Assam } from "../../assets/Assam.svg";
import { ReactComponent as Nagaland } from "../../assets/Nagaland.svg";
import { ReactComponent as Manipur } from "../../assets/Manipur.svg";
import { ReactComponent as Meghalaya } from "../../assets/Meghalaya.svg";
import { ReactComponent as Tripura } from "../../assets/Tripura.svg";
import { ReactComponent as Mizoram } from "../../assets/Mizoram.svg";

const Map = () => {
  const [stateName, setStateName] = useState("Enajori North East");

  const handleStateHover = (name) => {
    setStateName(name);
  };

  return (
    <div className="relative w-content bg-color2">
      <div className="flex  w-1/3 ">
        <svg className=" w-full h-full" viewBox="0 0 1024 966">
          {/* Render the state SVGs */}
          <g transform="translate(250, 78)">
            <ArunachalPradesh
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Arunachal Pradesh")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
          <g transform="translate(0, 282)">
            <Assam
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Assam")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
          <g transform="translate(480, 414)">
            <Nagaland
              className="hover:cursor-pointer"
              style={{ fill: "red" }}
              onMouseEnter={() => handleStateHover("Nagaland")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
          <g transform="translate(18, 542)">
            <Meghalaya
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Meghalaya")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
          <g transform="translate(432, 600)">
            <Manipur
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Manipur")}
              onMouseLeave={() => handleStateHover("")}
            />
          </g>
          <g transform="translate(195, 758)">
            <Tripura
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Tripura")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
          <g transform="translate(340, 760)">
            <Mizoram
              className="hover:cursor-pointer"
              onMouseEnter={() => handleStateHover("Mizoram")}
              onMouseLeave={() => handleStateHover("North East")}
            />
          </g>
        </svg>
      </div>

      {/* Label to display the state name */}

      <div className="m-10">
        <p className="font-gloock mb-3 text-color4 text-2xl ">{stateName}</p>
        {/* <p className="font-poppins mb-3 text-color4 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          cupiditate, eveniet ad consectetur numquam facilis qui eius quibusdam
          consequuntur. Reprehenderit molestiae natus provident optio officiis
          molestias quidem ex beatae quibusdam.
        </p> */}
      </div>
    </div>
  );
};

export default Map;
