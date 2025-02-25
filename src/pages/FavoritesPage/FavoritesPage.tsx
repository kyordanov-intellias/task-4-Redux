import { FC } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import FavoritesSection from "./FavoritesSetion";

const FavoritesPage: FC = () => {
  const { favorites, handleToggleFavorite } = useFavorites();

  return (
    <FavoritesSection
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default FavoritesPage;
