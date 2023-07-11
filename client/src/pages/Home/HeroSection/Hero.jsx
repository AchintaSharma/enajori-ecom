import { ReactComponent as HeroVector } from "../../../assets/hero-vector.svg";
import Item from "../../../assets/Item.png";
import { ReactComponent as ArunachalPradesh } from "../../../assets/ArunachalPradesh.svg";
import { ReactComponent as Assam } from "../../../assets/Assam.svg";
import { ReactComponent as Nagaland } from "../../../assets/Nagaland.svg";
import { ReactComponent as Manipur } from "../../../assets/Manipur.svg";
import { ReactComponent as Meghalaya } from "../../../assets/Meghalaya.svg";
import { ReactComponent as Tripura } from "../../../assets/Tripura.svg";
import { ReactComponent as Mizoram } from "../../../assets/Mizoram.svg";

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* <svg className="absolute w-full top-20 left-16" viewBox="0 0 1200 450"> */}
      <svg
        className="absolute w-full z-0 top-20 left-16"
        viewBox="0 0 1200 450"
      >
        <g transform="translate(10 10)">
          <HeroVector />
        </g>
      </svg>
      <svg
        className="w-full absolute top-14 left-0 z-10"
        viewBox="0 0 4000 1200"
      >
        <g transform="translate(350 80)">
          <ArunachalPradesh fill="white" className="" />
        </g>
        <g transform="translate(100 282)">
          <Assam fill="white" className="" />
        </g>
        <g transform="translate(580 414)">
          <Nagaland fill="white" className="" />
        </g>
        <g transform="translate(532 600)">
          <Manipur fill="white" className="" />
        </g>
        <g transform="translate(120 545)">
          <Meghalaya fill="white" className="" />
        </g>
        <g transform="translate(294 758)">
          <Tripura fill="white" className="" />
        </g>
        <g transform="translate(438 766)">
          <Mizoram fill="white" className="" />
        </g>
      </svg>
      {/* <a href="/" className="flex items-center"> */}
      <img
        src={Item}
        className="absolute top-2/12 left-1/4 md:h-64 lg:h-96 mr-3"
        alt="Hero bg vector"
      />
    </div>
  );
};

export default Hero;
