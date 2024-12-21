import { FaVideo, FaThList, FaUserPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <header className="left-0 w-full z-10 bg-black bg-opacity-50 py-4 px-10 flex justify-between items-center sticky top-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-red-600">MovieFlix</h1>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " px-6 cursor-pointer space-x-2 flex items-center text-red-600 "
                : "flex items-center space-x-2 text-white hover:text-red-600 transition duration-300"
            }
          >
            <FaVideo size={30} />
            <span>Movies</span>
          </NavLink>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive
                ? " px-6 cursor-pointer space-x-2 flex items-center text-red-600 "
                : "flex items-center space-x-2 text-white hover:text-red-600 transition duration-300"
            }
          >
            <FaThList />
            <span>Genre</span>
          </NavLink>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              isActive
                ? " px-6 cursor-pointer space-x-2 flex items-center text-red-600 "
                : "flex items-center space-x-2 text-white hover:text-red-600 transition duration-300"
            }
          >
            <FaUserPlus />
            <span>Add User</span>
          </NavLink>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
}
