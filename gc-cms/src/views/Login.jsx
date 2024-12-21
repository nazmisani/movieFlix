import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import axios from "axios";
import url from "../url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "You already logged in",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
          color: "#000000",
        },
      }).showToast();
      navigate("/");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/apis/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", data.data.access_token);

      navigate("/");

      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
          zIndex: 80,
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
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
    }
  }
  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://user-images.githubusercontent.com/16425113/129554147-6ac7ba51-43e7-4c8e-ba77-e646a3ef6b12.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mb-10 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
