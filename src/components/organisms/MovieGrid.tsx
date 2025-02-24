import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieCard from "../molecules/MovieCard";
import { Movie } from "../../types/movie";
import "./MovieGrid.css"; // Import the CSS file

interface MovieGridProps {
  movies: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const MovieGrid: FC<MovieGridProps> = ({ movies, onToggleFavorite }) => {
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          onToggleFavorite={() => onToggleFavorite(movie)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
