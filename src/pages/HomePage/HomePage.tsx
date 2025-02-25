import { FC } from "react";
import "./HomePage.css";
import { useHomePageLogic } from "../../hooks/useHomePageLogic";
import HomeSearchSection from "./HomeSearchSection";
import MoviesSection from "./HomeMovieSection";

const HomePage: FC = () => {
  const {
    searchTerm,
    handleSearch,
    handleToggleFavorite,
    isLoading,
    error,
    displayedMovies,
  } = useHomePageLogic();

  return (
    <div className="home-container">
      <HomeSearchSection onSearch={handleSearch} />
      <MoviesSection
        movies={displayedMovies}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default HomePage;
