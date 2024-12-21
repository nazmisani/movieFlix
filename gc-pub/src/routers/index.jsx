import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import Detail from "../views/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);

export default router;
