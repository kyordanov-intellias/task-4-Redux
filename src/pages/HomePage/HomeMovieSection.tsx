import { FC } from "react";
import MovieGrid from "../../components/organisms/MovieGrid/MovieGrid";
import { Movie } from "../../types/movie";

interface MoviesSectionProps {
  movies: Movie[] | undefined;
  isLoading: boolean;
  error: any;
  searchTerm: string;
  onToggleFavorite: (movie: Movie) => void;
}

const MoviesSection: FC<MoviesSectionProps> = ({
  movies,
  isLoading,
  error,
  searchTerm,
  onToggleFavorite,
}) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">An error occurred while fetching movies</div>;
  }

  if (!movies || movies.length === 0) {
    return <p className="no-movies">No movies found.</p>;
  }

  return (
    <div>
      <h2>{searchTerm ? "Search Results" : "Featured Movies"}</h2>
      <MovieGrid movies={movies} onToggleFavorite={onToggleFavorite} />
    </div>
  );
};

export default MoviesSection;
