import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieDetails, SearchResponse } from '../../types/movie';

const API_KEY = '6488c334';
const BASE_URL = 'https://www.omdbapi.com';

// List of movies to fetch on the homepage
const FEATURED_MOVIES = [
  'tt0468569', // The Dark Knight
  'tt0816692', // Interstellar
  'tt0133093', // The Matrix
  'tt0109830', // Forrest Gump
  'tt0110912', // Pulp Fiction
  'tt0167260', // The Lord of the Rings
  'tt0114369', // Se7en
  'tt0137523'  // Fight Club
];

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchMovies: builder.query<Movie[], string>({
      query: (searchTerm) => `/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`,
      transformResponse: (response: SearchResponse) => response.Search || [],
    }),
    getMovieById: builder.query<MovieDetails, string>({
      query: (imdbID) => `/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
    }),
    getFeaturedMovies: builder.query<MovieDetails[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(
          FEATURED_MOVIES.map(async (id) => {
            const result = await fetchWithBQ(`/?apikey=${API_KEY}&i=${id}&plot=full`);
            return result.data as MovieDetails;
          })
        );
        return { data: results.filter(Boolean) };
      },
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetFeaturedMoviesQuery,
} = movieApi;