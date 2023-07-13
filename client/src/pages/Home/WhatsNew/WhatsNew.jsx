import Carousel from "./components/Carousel";
const WhatsNew = () => {
  return (
    <div className="flex bg-color2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
        <div className="col-span-1 flex md:hidden flex-col justify-center relative">
          <p className="ml-10 font-gloock text-color4 text-6xl font-medium">
            What's New
          </p>
          {/* <p className="mt-5 ml-10 font-poppins text-base text-color4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            laboriosam.
          </p>
          <div className="absolute bottom-10 right-20">
            <button className="px-6 py-2 rounded-full bg-color4 text-color6 font-roboto font-medium text-sm">
              View Product
            </button>
          </div> */}
        </div>
        <div className="col-span-1">
          <Carousel />
        </div>
        <div className="col-span-1 hidden md:flex flex-col md:pt-3 lg:justify-center relative">
          <p className="ml-10 font-gloock text-color4 text-6xl font-medium">
            What's New
          </p>
          <p className="mt-5 ml-10 font-poppins text-base text-color4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            laboriosam.
          </p>
          <div className="absolute bottom-0 right-0 lg:bottom-10 lg:right-20">
            <button className="px-6 py-2 rounded-full bg-color4 text-color6 font-roboto font-medium text-sm">
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
