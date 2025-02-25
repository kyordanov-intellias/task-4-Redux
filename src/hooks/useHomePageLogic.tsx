import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  useGetFeaturedMoviesQuery,
  useSearchMoviesQuery,
} from "../store/api/movieApi";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/slices/moviesSlice";
import { Movie } from "../types/movie";

export const useHomePageLogic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchMoviesQuery(searchTerm, { skip: !searchTerm });

  const {
    data: featuredMovies,
    isLoading: isFeaturedLoading,
    error: featuredError,
  } = useGetFeaturedMoviesQuery();

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleToggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return {
    searchTerm,
    handleSearch,
    handleToggleFavorite,
    isLoading: isSearchLoading || isFeaturedLoading,
    error: searchError || featuredError,
    displayedMovies: searchTerm ? searchResults : featuredMovies,
  };
};
