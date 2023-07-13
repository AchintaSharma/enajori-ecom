import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import ShopByCategory from "./pages/ShopByCategory/ShopByCategory";
import ShopByState from "./pages/ShopByState/ShopByState";
import OurStory from "./pages/OurStory/OurStory";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import DemoComponent from "./components/DemoComponent";

function App() {
  let location = useLocation();

  const routes = useRoutes([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/new-arrivals",
      element: <NewArrivals />,
    },
    {
      path: "/shop-by-category",
      element: <ShopByCategory />,
    },
    {
      path: "/shop-by-state",
      element: <ShopByState />,
    },
    {
      path: "/our-story",
      element: <OurStory />,
    },
    {
      path: "/demo",
      // element: <DemoComponent />,
    },
  ]);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return routes;
  } else {
    return (
      <>
        <Navbar />
        {routes}
        <Footer />
      </>
    );
  }
}

export default App;
