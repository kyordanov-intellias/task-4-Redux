import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface UserMoviesState {
  createdMovies: Movie[];
}

const loadCreatedMovies = (): Movie[] => {
  try {
    const savedMovies = localStorage.getItem("userCreatedMovies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  } catch (error) {
    console.error("Error loading created movies:", error);
    return [];
  }
};

const initialState: UserMoviesState = {
  createdMovies: loadCreatedMovies(),
};

const saveCreatedMovies = (movies: Movie[]) => {
  try {
    localStorage.setItem("userCreatedMovies", JSON.stringify(movies));
  } catch (error) {
    console.error("Error saving created movies:", error);
  }
};

const userMoviesSlice = createSlice({
  name: "userMovies",
  initialState,
  reducers: {
    addCreatedMovie: (state, action: PayloadAction<Movie>) => {
      state.createdMovies.push({
        ...action.payload,
        imdbID: `user_${Date.now()}`,
      });
      saveCreatedMovies(state.createdMovies);
    },
    deleteCreatedMovie: (state, action: PayloadAction<string>) => {
      state.createdMovies = state.createdMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      saveCreatedMovies(state.createdMovies);
    },
  },
});

export const { addCreatedMovie, deleteCreatedMovie } = userMoviesSlice.actions;
export default userMoviesSlice.reducer; 