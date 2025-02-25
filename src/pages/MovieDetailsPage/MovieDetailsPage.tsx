import { FC } from "react";
import { useMovieDetailsLogic } from "../../hooks/useMovieDetailsLogic";
import { Heart, HeartOff } from "lucide-react";
import Button from "../../components/atoms/Button/Button";
import MovieReviewForm from "../../components/MovieReviewForm/MovieReviewForm";
import "./MovieDetailsPage.css";
import { PacmanLoader } from "react-spinners";

const MovieDetailsPage: FC = () => {
  const {
    movie,
    review,
    isFavorite,
    showReviewForm,
    setShowReviewForm,
    handleToggleFavorite,
    handleDeleteReview,
  } = useMovieDetailsLogic();

  if (!movie) {
    return <PacmanLoader className="suspence-loader" color="#3b82f6" />;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="movie-poster-section">
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            className="movie-poster"
          />
        </div>

        <div className="movie-info-section">
          <div className="movie-header">
            <h1>{movie?.Title}</h1>
            <Button
              onClick={handleToggleFavorite}
              variant={isFavorite ? "danger" : "primary"}
              disabled={!movie}
            >
              {isFavorite ? <HeartOff size={20} /> : <Heart size={20} />}
            </Button>
          </div>
          <div className="movie-meta">
            <span>{movie?.Year}</span>
            <span>{movie?.Runtime}</span>
            <span>{movie?.Genre}</span>
          </div>

          <div className="movie-rating">
            <span>IMDb Rating: {movie?.imdbRating}</span>
          </div>

          <p className="movie-plot">{movie?.Plot}</p>

          <div className="movie-details">
            <p>
              <strong>Director:</strong> {movie?.Director}
            </p>
            <p>
              <strong>Writers:</strong> {movie?.Writer}
            </p>
            <p>
              <strong>Actors:</strong> {movie?.Actors}
            </p>
          </div>

          {movie && (
            <div className="review-section">
              <h2>Your Review</h2>
              {review ? (
                <div className="existing-review">
                  <div className="review-header">
                    <div className="review-rating">
                      Rating: {review.rating}/10
                    </div>
                    <div className="review-date">
                      Last modified:{" "}
                      {new Date(review.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="review-content">{review.review}</p>
                  <div className="review-actions">
                    <button
                      className="edit-review-button"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Edit Review
                    </button>
                    <button
                      className="delete-review-button"
                      onClick={handleDeleteReview}
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ marginBottom: "20px" }}>No reviews yet</p>
                  <button
                    className="add-review-button"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Add Review
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showReviewForm && movie && (
        <div className="review-form-overlay">
          <MovieReviewForm
            movie={movie}
            existingReview={review}
            onClose={() => setShowReviewForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
