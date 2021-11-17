import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../fetch-service';
import '../HomePage/HomePage.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage({ loader }) {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchMovies = async function () {
      try {
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
      <h1 className="home-title">Trending today</h1>
      {Status.PENDING && spinner && loader}
      {Status.RESOLVED && trendMovies.length > 0 && (
        <ul className="home-collection">
          {trendMovies.map(
            movie =>
              movie.title && (
                <li className="home-item" key={movie.id}>
                  <Link
                    className="home-link"
                    to={{
                      pathname: `movies/${movie.id}`,
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      width="186"
                      height=""
                    />
                    {/* {movie.title} */}
                  </Link>
                </li>
              ),
          )}
        </ul>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}
