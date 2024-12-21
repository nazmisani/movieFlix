import { useNavigate } from "react-router-dom";

export default function Card({ movie }) {
  const navigate = useNavigate();
  return (
    <>
      <div key={movie.id}>
        <div className="group relative overflow-hidden rounded-lg cursor-pointer">
          <img
            src={movie.imgUrl}
            alt="Movie Poster"
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => navigate(`/detail/${movie.id}`)}
          />
          <div className="absolute bottom-6 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p className="text-sm">
              {movie.synopsis.length >= 100
                ? movie.synopsis.substring(0, 120) + "..."
                : movie.synopsis}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
