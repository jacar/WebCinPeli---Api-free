import axios from 'axios';
import { Movie, TvShow, SearchResponse } from '../types/api';

const API_KEY = 'cc900a367cb207f8cbf6cd5d084a869d';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkwMGEzNjdjYjIwN2Y4Y2JmNmNkNWQwODRhODY5ZCIsIm5iZiI6MTcyNjI1MTM0OC45NjYsInN1YiI6IjY2ZTQ4MTU0OTAxM2ZlODcyMjI0MzIwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYeGDzln3leOHvyw7Cckm13eM7JYbx2YTfJq260Gan0'
  }
});

export const getMovies = async (category: string) => {
  const response = await tmdbApi.get(`/movie/${category}`);
  return response.data;
};

export const getTvShows = async (category: string) => {
  const response = await tmdbApi.get(`/tv/${category}`);
  return response.data;
};

export const getLatestMovies = async () => {
  const response = await tmdbApi.get('/movie/now_playing');
  return response.data;
};

export const searchContent = async (query: string) => {
  if (!query) return { results: [] };
  const response = await tmdbApi.get<SearchResponse>('/search/multi', {
    params: { query }
  });
  return response.data;
};

export const getDetails = async (mediaType: 'movie' | 'tv', id: string) => {
  const response = await tmdbApi.get(`/${mediaType}/${id}`, {
    params: { append_to_response: 'videos,credits' }
  });
  return response.data;
};

export const getGenres = async (mediaType: 'movie' | 'tv') => {
  const response = await tmdbApi.get(`/genre/${mediaType}/list`);
  return response.data;
};