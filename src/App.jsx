import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Events from "./pages/Events";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Home />},
      {path:"/vehicles",element:<Vehicles />},
      {path:"/events",element:<Events />},
      {path:"/about",element:<About />}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
