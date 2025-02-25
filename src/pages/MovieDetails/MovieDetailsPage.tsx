import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  getMovieDetails,
  addToFavorites,
  removeFromFavorites,
  clearSelectedMovie,
} from "../../store/slices/moviesSlice";
import { deleteReview } from "../../store/slices/movieReviewsSlice";
import { Heart, HeartOff } from "lucide-react";
import Button from "../../components/atoms/Button";
import MovieReviewForm from "../../components/MovieReview/MovieReviewForm";
import "./MovieDetailsPage.css";
import Swal from "sweetalert2";

const MovieDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const movie = useSelector((state: RootState) => state.movies.selectedMovie);

  const review = useSelector((state: RootState) =>
    state.movieReviews.reviews.find((review) => review.movieId === id)
  );

  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.imdbID === movie?.imdbID);

  useEffect(() => {
    dispatch(clearSelectedMovie());
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id]);

  // if (!movie) {
  //   return <div>No Movie</div>;
  // }

  const handleDeleteReview = () => {
    if (!review) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(review.id));

        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

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
                  <p style={{ marginBottom: "20px" }}>No reviews yes</p>
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
