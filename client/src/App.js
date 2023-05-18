import { useLocation, useRoutes } from "react-router-dom";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

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
      // element: <Home />,
    },
  ]);

  if (location.pathname === "/register" || location.pathname === "/login") {
    return routes;
  } else {
    return (
      <>
        {/* <Navbar /> */}
        {routes}
      </>
    );
  }
}

export default App;
