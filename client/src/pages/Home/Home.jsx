import Map from "./MapSection/Map";
import Hero from "./HeroSection/Hero";
import BestSeller from "./BestSeller/BestSeller";
import WhatsNew from "./WhatsNew/WhatsNew";

const Home = () => {
  return (
    <>
      <Hero />
      <WhatsNew />
      <BestSeller />
      <Map />
    </>
  );
};

export default Home;
