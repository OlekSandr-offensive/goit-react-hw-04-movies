import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../fetch-service';
// import * as homePageAPI from '../../fetch-service';
import '../HomePage/HomePage.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage({ loader }) {
  const { url } = useRouteMatch();
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // homePageAPI.fetchTrendingMovies().then(setTrendMovies);
    const fetchMovies = async function () {
      try {
        setSpinner(true);
        const data = await fetchTrendingMovies();
        setStatus(Status.RESOLVED);
        setTrendMovies(date => [...date, ...data.results]);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {spinner && loader}
      {trendMovies.length > 0 && (
        <ul>
          {trendMovies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
