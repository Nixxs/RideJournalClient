import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Home />},
      {path:"/vehicles",element:<Vehicles />}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
