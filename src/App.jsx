import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Events from "./pages/Events";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import NewEvent from "./pages/NewEvent";
import VehicleProfile from "./pages/VehicleProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Home />},
      {path:"/vehicles", element:<Vehicles />},
      {path:"/vehicles/:id", element: <VehicleProfile />},
      {path:"/events",element:<Events />},
      {path:"/profile/:id",element:<UserProfile />},
      {path:"/newevent",element:<NewEvent />},
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
