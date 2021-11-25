const API_KEY = '3e3ad4fe8ef93a013732290a26488529';
const BASE_URL = 'https://api.themoviedb.org';

async function fetchWithErrorHandler(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('No found'));
}

export function fetchTrendingMovies(page) {
  return fetchWithErrorHandler(
    `${BASE_URL}/3/trending/all/day?api_key=${API_KEY}&page=${page}`,
  );
}

export function fetchMoviesById(movieId) {
  return fetchWithErrorHandler(
    `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchSerchMovies(searchMovies, page) {
  return fetchWithErrorHandler(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${searchMovies}&language=en-US&page=1&include_adult=false&page=${page}`,
  );
}

export function fetchMoviesCredits(movieId) {
  return fetchWithErrorHandler(`${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US
`);
}

export function fetchMoviesReviews(movieId) {
  return fetchWithErrorHandler(`${BASE_URL}/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1
`);
}
