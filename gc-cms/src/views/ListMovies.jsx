import { useState } from "react";
import Toastify from "toastify-js";
import { Link } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import url from "../url";
import gif from "../assets/Gear@1x-0.2s-200px-200px (1).svg";
import { FaEdit, FaTrashAlt, FaUpload } from "react-icons/fa";

export default function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovie();
  }, []);

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${url}/apis/movie/movies`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMovies(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/movie/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchMovie();
      Toastify({
        text: "Successfully deleted data",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  async function handleUpload(file, id) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(`${url}/apis/movie/movies/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchMovie();
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <div className="flex justify-center mt-28">
          <img src={gif} className="w-1/5" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-zinc-950 shadow-md rounded-lg max-w-max m-auto my-10 p-4 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Movie List</h1>
          <Link
            to={"/add"}
            className="bg-white hover:bg-red-600 text-black hover:text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
          >
            + Add Movie
          </Link>
        </div>

        <table className="border border-white text-left text-white w-full">
          <thead className="bg-white">
            <tr>
              <th className="border bg-red-600 border-white px-2 py-2 ">No</th>
              <th className="border bg-red-600 border-white px-2 py-2 w-1">Title</th>
              <th className="border bg-red-600 border-white px-2 py-2">Synopsis</th>
              <th className="border bg-red-600 border-white px-2 py-2">Trailer</th>
              <th className="border bg-red-600 border-white px-2 py-2">Rating</th>
              <th className="border bg-red-600 border-white px-2 py-2">Image</th>
              <th className="border bg-red-600 border-white px-2 py-2 w-64">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => {
              return (
                <tr key={index}>
                  <td className="border border-white px-2 py-2 text-center">{index + 1}</td>
                  <td className="border border-white px-2 py-2">{movie.title}</td>
                  <td className="border border-white px-2 py-2">
                    {movie.synopsis.length > 50
                      ? `${movie.synopsis.slice(0, 40)}...`
                      : movie.synopsis}
                  </td>
                  <td className="border border-white px-2 py-2">
                    <a href={movie.trailerUrl} className="text-center">
                      Watch Trailer
                    </a>
                  </td>

                  <td className="border border-white px-2 py-2 text-center">{movie.rating}/10</td>
                  <td className="border border-white px-2 py-2">
                    <img src={movie.imgUrl} alt="" className="h-40 w-40 object-cover rounded" />
                  </td>
                  <td className="border border-white px-2 py-2 text-center">
                    <div className="flex justify-evenly items-center space-x-2">
                      <Link
                        to={`/edit/${movie.id}`}
                        className="text-white hover:text-red-600 p-2 rounded transition duration-300"
                        title="Edit"
                      >
                        <FaEdit size={40} />
                      </Link>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-white hover:text-red-600 p-2 rounded  transition duration-300"
                        title="Delete"
                      >
                        <FaTrashAlt size={40} />
                      </button>
                      <label
                        className="text-white hover:text-red-600 p-2 rounded  transition duration-300 cursor-pointer"
                        title="Upload"
                        htmlFor={`upload${movie.id}`}
                      >
                        <FaUpload size={40} />
                        <input
                          id={`upload${movie.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleUpload(e.target.files[0], movie.id)}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
