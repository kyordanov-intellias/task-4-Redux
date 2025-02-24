import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './api/movieApi';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;