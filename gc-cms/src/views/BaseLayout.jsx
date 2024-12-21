import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Toastify from "toastify-js";

export default function BaseLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.access_token) {
      Toastify({
        text: "Please Login First",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#E50914",
          color: "#000000",
        },
      }).showToast();
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
