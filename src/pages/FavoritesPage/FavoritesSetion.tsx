import { FC } from "react";
import MovieGrid from "../../components/organisms/MovieGrid/MovieGrid";
import { Movie } from "../../types/movie";
import "./FavoritesPage.css";

interface FavoritesSectionProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const FavoritesSection: FC<FavoritesSectionProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="favorites-message">No favorite movies yet.</p>
      ) : (
        <MovieGrid movies={favorites} onToggleFavorite={onToggleFavorite} />
      )}
    </div>
  );
};

export default FavoritesSection;
