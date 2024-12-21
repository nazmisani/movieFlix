import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

export default function LandingPage() {
  const [movies, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [genres, setGenre] = useState([]);
  const pagination = getPagination();

  function getPagination() {
    const rangeSize = 10;
    const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const endPage = Math.min(startPage + rangeSize - 1, totalPage);
    let temp = [];
    for (let i = startPage; i <= endPage; i++) {
      temp.push(i);
    }
    return temp;
  }

  async function fecthMovie() {
    try {
      let url = `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies?page=${currentPage}&limit=12&q=${search}`;
      if (filter) url += `&i=${filter}`;
      if (sort) url += `&sort=${sort}`;

      const { data } = await axios.get(url);
      setMovie(data.data.query);
      setCurrentPage(data.data.pagination.currentPage);
      setTotalPage(data.data.pagination.totalPage);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchGenre() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/pub/movie/genres");
      setGenre(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const scrollToCards = () => {
    const cardsSection = document.getElementById("Card");
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fecthMovie();
    fetchGenre();
  }, []);

  useEffect(() => {
    fecthMovie(currentPage);
  }, [search, sort, filter, currentPage]);

  return (
    <>
      <header className="left-0 w-full z-10 bg-black bg-opacity-50 py-4 px-6 flex justify-between items-center sticky top-0">
        <h1 className="text-2xl font-bold text-red-600">MovieFlix</h1>
      </header>

      <section className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://wallpaperaccess.com/full/242850.jpg"
            alt="Featured Movie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
        </div>

        <div className="relative flex flex-col justify-center items-start h-full px-10 text-white z-20">
          <h2 className="text-5xl font-bold mb-4">Unlimited movies</h2>
          <p className="text-lg">An exciting adventure awaits you!</p>
          <button
            onClick={scrollToCards}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            Watch Now
          </button>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="flex justify-center gap-4">
          <div className="relative">
            <select
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="">All Genre</option>
              {genres.map((genre) => (
                <option key={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>

          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search movies..."
              className="px-4 py-2 w-full rounded-lg bg-zinc-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="">Sort by</option>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div
          id="Card"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-24"
        >
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="py-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage == 1}
          className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded disabled:opacity-50 text-white"
        >
          Prev
        </button>

        <div className="flex items-center gap-x-1">
          {pagination.map((el) => (
            <button
              type="button"
              key={el}
              className={
                el === currentPage
                  ? "min-h-[38px] min-w-[53px] flex justify-center items-center bg-red-600 py-2 px-3 text-sm rounded-lg border-2 text-white"
                  : "min-h-[38px] min-w-[53px] flex justify-center items-center rounded-lg border-2  hover:bg-zinc-700 hover:border-2  py-2 px-3 text-sm text-white"
              }
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPage}
          className="px-4 py-2 bg-red-600 hover:bg-red-800  rounded disabled:opacity-50 text-white"
        >
          Next
        </button>
      </section>

      <footer className="bg-zinc-700 py-6 text-center">
        <p className="text-sm text-white">© 2024 MovieFlix. All rights reserved.</p>
      </footer>
    </>
  );
}
