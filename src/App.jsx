import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Events from "./pages/Events";
import About from "./pages/About";
import MyVehicles from "./pages/MyVehicles";
import NewEvent from "./pages/NewEvent";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Home />},
      {path:"/vehicles",element:<Vehicles />},
      {path:"/events",element:<Events />},
      {path:"/myvehicles",element:<MyVehicles />},
      {path:"/newevent",element:<NewEvent />},
      {path:"/profile",element:<Profile />},
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
