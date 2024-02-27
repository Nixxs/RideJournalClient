import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Events from "./pages/Events";
import About from "./pages/About";
import MyVehicles from "./pages/MyVehicles";
import NewEvent from "./pages/NewEvent";
import Vehicle from "./pages/Vehicle";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Vehicles />},
      {path:"/vehicles", element:<Vehicles />},
      {path:"/vehicles/:id", element: <Vehicle />},
      {path:"/events",element:<Events />},
      {path:"/myvehicles/:id",element:<MyVehicles />},
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
