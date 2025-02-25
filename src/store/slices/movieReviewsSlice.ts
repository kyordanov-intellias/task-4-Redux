import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieReview } from "../../types/movieReview";

interface MovieReviewsState {
  reviews: MovieReview[];
}

const loadReviews = (): MovieReview[] => {
  try {
    const savedReviews = localStorage.getItem("movieReviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  } catch (error) {
    console.error("Error loading reviews:", error);
    return [];
  }
};

const initialState: MovieReviewsState = {
  reviews: loadReviews(),
};

const saveReviews = (reviews: MovieReview[]) => {
  try {
    localStorage.setItem("movieReviews", JSON.stringify(reviews));
  } catch (error) {
    console.error("Error saving reviews:", error);
  }
};

const movieReviewsSlice = createSlice({
  name: "movieReviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Omit<MovieReview, "id" | "dateAdded" | "lastModified">>) => {
      const newReview: MovieReview = {
        ...action.payload,
        id: `review_${Date.now()}`,
        dateAdded: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
      state.reviews.push(newReview);
      saveReviews(state.reviews);
    },
    updateReview: (state, action: PayloadAction<{ id: string; review: string; rating: number }>) => {
      const reviewIndex = state.reviews.findIndex(review => review.id === action.payload.id);
      if (reviewIndex !== -1) {
        state.reviews[reviewIndex] = {
          ...state.reviews[reviewIndex],
          review: action.payload.review,
          rating: action.payload.rating,
          lastModified: new Date().toISOString(),
        };
        saveReviews(state.reviews);
      }
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);
      saveReviews(state.reviews);
    },
  },
});

export const { addReview, updateReview, deleteReview } = movieReviewsSlice.actions;
export default movieReviewsSlice.reducer; 