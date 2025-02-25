import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromFavorites } from "../store/slices/moviesSlice";
import { deleteReview } from "../store/slices/movieReviewsSlice";
import { Movie } from "../types/movie";

export const useProfilePageLogic = () => {
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

  return {
    favorites,
    createdMovies,
    reviews,
    handleToggleFavorite,
    handleDeleteReview,
  };
};
