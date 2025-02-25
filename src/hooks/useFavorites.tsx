import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromFavorites } from "../store/slices/moviesSlice";
import { Movie } from "../types/movie";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(removeFromFavorites(movie.imdbID));
  };

  return { favorites, handleToggleFavorite };
};
