import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromFavorites } from "../../store/slices/moviesSlice";
import { deleteReview } from "../../store/slices/movieReviewsSlice";
import MovieGrid from "../../components/organisms/MovieGrid";
import { Movie } from "../../types/movie";
import "./ProfilePage.css";


const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const createdMovies = useSelector(
    (state: RootState) => state.userMovies.createdMovies
  );
  const reviews = useSelector((state: RootState) => state.movieReviews.reviews);

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(removeFromFavorites(movie.imdbID));
  };

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId));
    }
  };

  return (
    <div className="profile-container">
      <section className="section-container">
        <h2 className="section-title">My Favorites</h2>
        {favorites.length === 0 ? (
          <p className="section-message">No favorite movies yet.</p>
        ) : (
          <MovieGrid
            movies={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>

      <section className="section-container">
        <h2 className="section-title">My Created Movies</h2>
        {createdMovies.length === 0 ? (
          <p className="section-message">No created movies yet.</p>
        ) : (
          <MovieGrid
            movies={createdMovies}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>

      <section className="section-container">
        <h2 className="section-title">My Reviews</h2>
        {reviews.length === 0 ? (
          <p className="section-message">No reviews yet.</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3>{review.movieTitle}</h3>
                  <div className="review-rating">
                    Rating: {review.rating}/10
                  </div>
                </div>
                <p className="review-content">{review.review}</p>
                <div className="review-footer">
                  <span className="review-date">
                    {new Date(review.lastModified).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="delete-review-button"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
