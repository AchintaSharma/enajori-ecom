import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image1 from "../assets/best-sellers-1.png";
// import Image2 from "../assets/best-sellers-2.jpg";
const cartItems = [
  {
    image: Image1,
    name: "Cheaper Necklace",
    price: 200,
    quantity: 1,
  },
  {
    image: Image1,
    name: "Cheap Necklace",
    price: 300,
    quantity: 1,
  },
];
const Cart = () => {
  const calculatePrice = () => {
    let price = 0;
    for (let i = 0; i < cartItems.length; i++) {
      price += cartItems[i].price;
    }
    return price;
  };
  return (
    <div className="mt-20 fixed top-0 right-0 h-full md:w-1/2  bg-white ">
      <div className="flex flex-row mt-20 px-10 justify-between">
        <p className="text-4xl font-gloock">Your Cart</p>
        <FontAwesomeIcon className="pt-1" size="2xl" icon={faXmark} />
      </div>
      <hr className="border-1 border-color2 mx-5 my-8" />

      {/* Items */}
      {cartItems.map((item, index) => {
        return (
          <>
            <div key={index} className="flex flex-row mx-5">
              <img
                src={item.image}
                className="w-20 h-20 rounded-2xl object-cover"
                alt=""
              />
              <div className="flex-col flex-1 font-poppins ml-5">
                <p className="text-xl"> {item.name}</p>
                <div className="flex flex-row mt-5">
                  <p className="">Quantity</p>

                  <span className="material-symbols-outlined mx-2">
                    do_not_disturb_on
                  </span>
                  <p className="">{item.quantity}</p>
                  <span className="material-symbols-outlined mx-2">
                    add_circle
                  </span>
                </div>
              </div>
              <div className="flex-col font-poppins ml-5">
                <p className="text-xl">Rs {item.price}</p>
                <div className="flex flex-row mt-5 justify-end">
                  <button className="">Remove</button>
                </div>
              </div>
            </div>
            <hr className="border-1 border-color2 mx-5 my-8" />
          </>
        );
      })}
      <p className="font-poppins text-end mx-5 mt-[-20px]">
        Delivery charges will be calculated in checkout
      </p>
      <div className="flex flex-row justify-end mx-5 font-poppins text-xl mt-8 ">
        <p className="mr-20">Subtotal:</p>
        <p>Rs {calculatePrice()}</p>
      </div>
      <button className="mt-10 bg-color4 px-5 py-2 rounded-full ">
        {" "}
        Check out
      </button>
    </div>
  );
};

export default Cart;
