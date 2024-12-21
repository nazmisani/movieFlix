import Form from "../components/Form";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import url from "../url";

export default function AddMovie() {
  const navigate = useNavigate();

  async function handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId) {
    e.preventDefault();
    try {
      const body = { title, synopsis, trailerUrl, imgUrl, rating: +rating, genreId: +genreId };

      const { data } = await axios.post(`${url}/apis/movie/movies`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");

      Toastify({
        text: `Succeed add new movie ${data.data.title}`,
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
  return (
    <>
      <Form nameProp="Create New Movie" handleSubmit={handleSubmit} />
    </>
  );
}
