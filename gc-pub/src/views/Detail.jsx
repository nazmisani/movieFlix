import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function MovieDetail() {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies/${id}`
      );
      setMovies(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="fixed w-full bg-black bg-opacity-75 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-600">MovieFlix</h1>
          <button
            onClick={() => window.history.back()}
            className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-24">
        {/* Banner */}
        <div className="relative h-[30rem] overflow-hidden rounded-lg shadow-lg mb-12">
          <img src={movies.imgUrl} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
          <div className="absolute bottom-6 left-6 z-20">
            <h2 className="text-4xl font-bold">{movies.title}</h2>
          </div>
        </div>

        {/* Detail Section */}
        <section className="flex flex-col md:flex-row gap-10">
          {/* Left: Synopsis */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{movies.synopsis}</p>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/3 space-y-6">
            {/* Trailer */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">Trailer</h3>
              <a
                href={movies.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-red-600 text-white text-center px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Watch Trailer
              </a>
            </div>

            {/* Genre */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">Genres</h3>
              <ul className="flex flex-wrap gap-2">
                <li className="bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                  {movies?.Genre?.name}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-75 py-6 text-center">
        <p className="text-sm text-gray-500">© 2024 MovieFlix. All rights reserved.</p>
      </footer>
    </div>
  );
}
