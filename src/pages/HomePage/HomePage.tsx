import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import {
  useGetFeaturedMoviesQuery,
  useSearchMoviesQuery,
} from "../../store/api/movieApi";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/moviesSlice";

import { Movie } from "../../types/movie";

import SearchBar from "../../components/molecules/SearchBar";

import MovieGrid from "../../components/organisms/MovieGrid";
import "./HomePage.css"; 


const HomePage: FC = () => {
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

  const isLoading = isSearchLoading || isFeaturedLoading;
  const error = searchError || featuredError;
  const displayedMovies = searchTerm ? searchResults : featuredMovies;

  return (
    <div className="home-container">
      <div className="search-section">
        <h1>Movie Explorer</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error">An error occurred while fetching movies</div>
      )}

      {displayedMovies && displayedMovies.length > 0 && (
        <div>
          <h2>{searchTerm ? "Search Results" : "Featured Movies"}</h2>
          <MovieGrid
            movies={displayedMovies}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
