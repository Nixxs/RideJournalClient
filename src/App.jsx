import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<div>the outlet content from layout component</div>}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
