import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Home />},
      {path:"/vehicles",element:<Vehicles />},
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
