import React from "react";
import Slider from "react-slick";

import image1 from "../../../../assets/whats-new-1.png";
import image2 from "../../../../assets/whats-new-2.jpg";
import image3 from "../../../../assets/whats-new-3.jpg";
import image4 from "../../../../assets/whats-new-4.jpg";
import image5 from "../../../../assets/whats-new-5.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
const SlickCarouselDemo = () => {
  const images = [image1, image2, image3, image4, image5];
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt="" className="image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarouselDemo;
