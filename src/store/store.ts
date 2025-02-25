import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './api/movieApi';
import moviesReducer from './slices/moviesSlice';
import userMoviesReducer from './slices/userMoviesSlice';
import movieReviewsReducer from './slices/movieReviewsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    userMovies: userMoviesReducer,
    movieReviews: movieReviewsReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;