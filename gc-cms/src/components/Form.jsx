import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import url from "../url";

export default function Form({ nameProp, handleSubmit, movie }) {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);

  async function fetchGenre() {
    try {
      const { data } = await axios.get(`${url}/apis/movie/genres`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setGenres(data.data);
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
          background: "#E50914",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setSynopsis(movie.synopsis);
      setTrailerUrl(movie.trailerUrl);
      setImgUrl(movie.imgUrl);
      setRating(movie.rating);
      setGenreId(movie.genreId);
    }
  }, [movie]);

  useEffect(() => {
    fetchGenre();
  }, []);

  async function hanleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId);
  }

  return (
    <div className="max-w-md mx-auto m-32 p-6 bg-zinc-950 rounded-lg shadow-lg">
      <h1 className="text-white text-center text-2xl font-bold mb-6">{nameProp}</h1>
      <form onSubmit={hanleFormSubmit}>
        {/* title Input */}
        <div className="mb-4">
          <label htmlFor="Title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            placeholder="Enter Title"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Synopsis Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Synopsis
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            rows="3"
            placeholder="Enter synopsis"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </div>

        {/* Trailer Url Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-white mb-2">
            Trailer Url
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter Trailer"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label htmlFor="imgUrl" className="block text-white mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            placeholder="Enter image URL"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block text-white mb-2">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="Enter rating"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Genres Input */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-white mb-2">
            Genres
          </label>
          <select
            className="w-full px-3 py-2 border-2 rounded-md"
            name="genre"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-9">
          <Button nameProp={nameProp} />
        </div>
      </form>
    </div>
  );
}
