import Map from "./MapSection/Map";
import Footer from "../../components/Footer";
import Hero from "./HeroSection/Hero";
import BestSeller from "./BestSeller/BestSeller";
import Gallery from "./BestSeller/Gallery";
const Home = () => {
  return (
    <>
      {/* <Hero /> */}
      {/* <Gallery /> */}
      <BestSeller />
      <Map />
      <Footer />
    </>
  );
};

export default Home;
