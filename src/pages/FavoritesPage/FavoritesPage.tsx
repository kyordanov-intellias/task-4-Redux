import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromFavorites } from "../../store/slices/moviesSlice";
import MovieGrid from "../../components/organisms/MovieGrid";
import { Movie } from "../../types/movie";
import "./FavoritesPage.css"; // Import the CSS file

const FavoritesPage: FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(removeFromFavorites(movie.imdbID));
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="favorites-message">No favorite movies yet.</p>
      ) : (
        <MovieGrid movies={favorites} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
};

export default FavoritesPage;
