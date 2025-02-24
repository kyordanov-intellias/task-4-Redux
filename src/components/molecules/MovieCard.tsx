import React from "react";
import { Link } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { Movie } from "../../types/movie";
import Button from "../atoms/Button";
import "./MovieCard.css"; // Import the CSS file

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
          className="movie-image"
        />
      </Link>
      <div className="movie-details">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-footer">
          <span className="movie-year">{movie.Year}</span>
          <Button
            onClick={onToggleFavorite}
            variant={isFavorite ? "danger" : "primary"}
          >
            {isFavorite ? <HeartOff size={20} /> : <Heart size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
