import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addReview, updateReview } from "../../store/slices/movieReviewsSlice";
import { Movie } from "../../types/movie";
import "./MovieReviewForm.css";

interface MovieReviewFormProps {
  movie: Movie;
  existingReview?: {
    id: string;
    review: string;
    rating: number;
  };
  onClose: () => void;
}

const MovieReviewForm: FC<MovieReviewFormProps> = ({
  movie,
  existingReview,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(existingReview?.rating || 1);
  const [review, setReview] = useState(existingReview?.review || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (existingReview) {
      dispatch(
        updateReview({
          id: existingReview.id,
          review,
          rating,
        })
      );
    } else {
      dispatch(
        addReview({
          movieId: movie.imdbID,
          movieTitle: movie.Title,
          rating,
          review,
        })
      );
    }
    onClose();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>{existingReview ? "Edit Review" : "Add Review"}</h3>

      <div className="form-group">
        <label htmlFor="rating">Rating (1-10)</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          className="review-form-textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          rows={4}
        />
      </div>

      <div className="button-group">
        <button type="submit" className="submit-button">
          {existingReview ? "Update Review" : "Add Review"}
        </button>
        <button type="button" className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieReviewForm;
