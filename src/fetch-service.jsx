const API_KEY = '3e3ad4fe8ef93a013732290a26488529';
const BASE_URL = 'https://api.themoviedb.org';

async function fetchWithErrorHandler(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('No found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandler(
    `${BASE_URL}/3/trending/all/day?api_key=${API_KEY}`,
  );
}
