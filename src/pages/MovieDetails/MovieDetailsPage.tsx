import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMovieDetails,
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/moviesSlice";
import Button from "../../components/atoms/Button";
import { Heart, HeartOff } from "lucide-react";
import "./MovieDetailsPage.css"; // Import the CSS file

const MovieDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, loading, error, favorites } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [id, dispatch]);

  const isFavorite = favorites.some((movie) => movie.imdbID === id);

  const handleToggleFavorite = () => {
    if (!selectedMovie) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(selectedMovie.imdbID));
    } else {
      dispatch(addToFavorites(selectedMovie));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!selectedMovie) return <div className="not-found">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <img
          src={
            selectedMovie.Poster !== "N/A"
              ? selectedMovie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={selectedMovie.Title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1 className="movie-title">{selectedMovie.Title}</h1>
          <div className="movie-meta">
            <span>{selectedMovie.Year}</span>
            <span>{selectedMovie.Runtime}</span>
            <span>{selectedMovie.Genre}</span>
          </div>
          <p className="movie-plot">{selectedMovie.Plot}</p>
          <div className="movie-details-extra">
            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
          </div>
          <Button
            onClick={handleToggleFavorite}
            variant={isFavorite ? "danger" : "primary"}
            className="favorite-button"
          >
            {isFavorite ? (
              <>
                <HeartOff size={20} />
                Remove from Favorites
              </>
            ) : (
              <>
                <Heart size={20} />
                Add to Favorites
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
