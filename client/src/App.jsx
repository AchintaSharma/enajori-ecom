import { useLocation, useRoutes } from "react-router-dom";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import ShopByCategory from "./pages/ShopByCategory/ShopByCategory";
import ShopByState from "./pages/ShopByState/ShopByState";
import OurStory from "./pages/OurStory/OurStory";

import Navbar from "./components/Navbar";

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
  ]);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return routes;
  } else {
    return (
      <>
        <Navbar />
        {routes}
      </>
    );
  }
}

export default App;
