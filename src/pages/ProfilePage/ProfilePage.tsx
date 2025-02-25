import { FC } from "react";
import { useProfilePageLogic } from "../../hooks/useProfilePageLogic";
import MovieGrid from "../../components/organisms/MovieGrid/MovieGrid";
import "./ProfilePage.css";

const ProfilePage: FC = () => {
  const {
    favorites,
    createdMovies,
    reviews,
    handleToggleFavorite,
    handleDeleteReview,
  } = useProfilePageLogic();

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
