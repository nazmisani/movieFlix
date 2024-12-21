import { RouterProvider } from "react-router-dom";
import router from "./routers";

export default function App() {
  return (
    <>
      <div className="bg-zinc-900">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
