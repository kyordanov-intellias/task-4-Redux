import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, SearchResponse } from '../../types/movie';

const API_KEY = '6488c334';
const BASE_URL = 'https://www.omdbapi.com';

// Popular movies to fetch initially (you can modify this list)
const POPULAR_MOVIES = ['Batman', 'Inception', 'Matrix', 'Avengers'];

interface MoviesState {
  searchResults: Movie[];
  favorites: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

// Load favorites from localStorage
const loadFavorites = (): Movie[] => {
  try {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const initialState: MoviesState = {
  searchResults: [],
  favorites: loadFavorites(),
  selectedMovie: null,
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (searchTerm: string) => {
    const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }
    return data.Search || [];
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getDetails',
  async (imdbID: string) => {
    const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    return data;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const randomMovie = POPULAR_MOVIES[Math.floor(Math.random() * POPULAR_MOVIES.length)];
    const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(randomMovie)}&type=movie`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }
    return data.Search || [];
  }
);

const saveFavorites = (favorites: Movie[]) => {
  try {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      if (!state.favorites.find(movie => movie.imdbID === action.payload.imdbID)) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
      saveFavorites(state.favorites);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch popular movies';
      });
  },
});

export const { addToFavorites, removeFromFavorites, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;