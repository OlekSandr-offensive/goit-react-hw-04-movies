import React from 'react';
import { Link } from 'react-router-dom';
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

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // homePageAPI.fetchTrendingMovies().then(setTrendMovies);
    const fetchMovies = async function () {
      try {
        const data = await fetchTrendingMovies();
        setTrendMovies(date => [...date, ...data.results]);
      } catch (error) {
        // setStatus(Status.REJECTED);
        setError(error);
      }
    };
    const promise = fetchMovies();
    promise.then(result => console.log(result));
  }, []);

  return (
    <>
      <h1>Trending today</h1>

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
    </>
  );
}
