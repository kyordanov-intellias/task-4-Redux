import { FC } from "react";
import { Link } from "react-router-dom";
import { Heart, HeartOff, Trash2 } from "lucide-react";
import { Movie } from "../../../types/movie";
import Button from "../../atoms/Button/Button";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDeleteMovie?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onDeleteMovie,
}) => {
  return (
    <div className="movie-card">
      {!movie.CreatedByMe && (
        <Link to={`/movie/${movie.imdbID}`}>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"
            }
            alt={movie.Title}
            className="movie-image"
          />
        </Link>
      )}
      <div className="movie-details-card">
        <h3 className="movie-title-card">{movie.Title}</h3>
        <div className="movie-footer">
          <span className="movie-year">{movie.Year}</span>

          {movie.CreatedByMe && onDeleteMovie && (
            <Button onClick={onDeleteMovie}>
              <Trash2 />
            </Button>
          )}

          {!movie.CreatedByMe && (
            <Button
              onClick={onToggleFavorite}
              variant={isFavorite ? "danger" : "primary"}
            >
              {isFavorite ? <HeartOff size={20} /> : <Heart size={20} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
