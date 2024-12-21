import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import axios from "axios";
import url from "../url";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e, username, email, password, phoneNumber, address) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");

      Toastify({
        text: `Succedd add new user`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      Toastify({
        text: errorMessage,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#E50914",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
          zIndex: 9999,
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
  return (
    <div className="max-w-md mx-auto m-32 p-6 bg-zinc-950 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6">Add User</h1>
      <form onSubmit={(e) => handleSubmit(e, username, email, password, phoneNumber, address)}>
        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-white mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-white mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            placeholder="Enter address"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
