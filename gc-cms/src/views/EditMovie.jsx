import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import url from "../url";
import Form from "../components/Form";
import Toastify from "toastify-js";

export default function EditMovie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId) {
    e.preventDefault();
    try {
      const body = { title, synopsis, trailerUrl, imgUrl, rating: +rating, genreId: +genreId };

      const { data } = await axios.put(`${url}/apis/movie/movies/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");

      console.log(data);

      Toastify({
        text: `Succeed edit movie`,
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
      console.log(error);

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
        },
      }).showToast();
    }
  }

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${url}/apis/movie/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMovie(data.data || {});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {movie && Object.keys(movie).length > 0 ? (
        <Form movie={movie} handleSubmit={handleSubmit} nameProp="Edit Movie" />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
