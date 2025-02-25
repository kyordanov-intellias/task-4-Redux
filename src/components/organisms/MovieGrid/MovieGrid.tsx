import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MovieCard from "../../molecules/MovieCard/MovieCard";
import { Movie } from "../../../types/movie";
import "./MovieGrid.css";
import Swal from "sweetalert2";
import { setCreatedMovies } from "../../../store/slices/userMoviesSlice";

interface MovieGridProps {
  movies: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const MovieGrid: FC<MovieGridProps> = ({ movies, onToggleFavorite }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const handleDeleteMovie = (movie: Movie) => {
    Swal.fire({
      title: "Are you sure you want to delete this movie?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const storedMovies = JSON.parse(
          localStorage.getItem("userCreatedMovies") || "[]"
        );
        const updatedMovies = storedMovies.filter(
          (m: Movie) => m.imdbID !== movie.imdbID
        );
        localStorage.setItem(
          "userCreatedMovies",
          JSON.stringify(updatedMovies)
        );
        dispatch(setCreatedMovies(updatedMovies));
        Swal.fire("Deleted!", "Your movie has been deleted.", "success");
      }
    });
  };

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          onToggleFavorite={() => onToggleFavorite(movie)}
          onDeleteMovie={
            movie.CreatedByMe ? () => handleDeleteMovie(movie) : undefined
          }
        />
      ))}
    </div>
  );
};

export default MovieGrid;
