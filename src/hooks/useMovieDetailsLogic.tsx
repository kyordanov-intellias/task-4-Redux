import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  getMovieDetails,
  addToFavorites,
  removeFromFavorites,
  clearSelectedMovie,
} from "../store/slices/moviesSlice";
import { deleteReview } from "../store/slices/movieReviewsSlice";
import Swal from "sweetalert2";

export const useMovieDetailsLogic = () => {
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

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

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

  return {
    movie,
    review,
    isFavorite,
    showReviewForm,
    setShowReviewForm,
    handleToggleFavorite,
    handleDeleteReview,
  };
};
