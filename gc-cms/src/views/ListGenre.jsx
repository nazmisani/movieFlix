import axios from "axios";
import { useEffect, useState } from "react";

export default function ListGenres() {
  const [genres, setGenre] = useState([]);

  async function fetchGenre() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/movie/genres", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setGenre(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <>
      <div className="max-w-7xl mt-16 m-32  p-6 bg-zinc-950 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-6">Movie genres</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-left text-white">
          <thead className="bg-red-600">
            <tr>
              <th className="border px-4 py-2 text-center">No</th>
              <th className="border px-4 py-2 text-center">Name</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre, index) => (
              <tr key={genre.id} className="bg-zinc-950 hover:bg-red-400">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{genre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
