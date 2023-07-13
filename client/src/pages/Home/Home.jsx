import Map from "./MapSection/Map";
import Footer from "../../components/Footer";
import Hero from "./HeroSection/Hero";
import BestSeller from "./BestSeller/BestSeller";
import WhatsNew from "./WhatsNew/WhatsNew";

const Home = () => {
  return (
    <>
      <WhatsNew />
      {/* <Hero /> */}
      <BestSeller />
      <Map />
      <Footer />
    </>
  );
};

export default Home;
