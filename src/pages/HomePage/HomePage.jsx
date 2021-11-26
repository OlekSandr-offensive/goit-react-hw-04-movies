import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/fetch-service';
import ImageError from '../../components/ImageError/ImageError';
import '../HomePage/HomePage.scss';
import PaginationBox from '../../components/PaginationBox/PaginationBox';
import MyScroll from '../../services/myScroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage({ loader }) {
  const location = useLocation();

  const [trendMovies, setTrendMovies] = useState(null);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchMovies = async function () {
      try {
        const response = await fetchTrendingMovies(page);

        setStatus(Status.RESOLVED);
        setPage(response.page);
        setTrendMovies(response);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
        MyScroll();
      }
    };

    fetchMovies();
  }, [page]);

  const onChangePage = page => {
    setPage(page);
  };

  return (
    <>
      <h1 className="home-title">Trending today</h1>
      {Status.PENDING && spinner && loader}

      {Status.RESOLVED && trendMovies && (
        <>
          <ul className="home-collection">
            {trendMovies.results.map(
              movie =>
                movie.title && (
                  <li className="home-item" key={movie.id}>
                    <Link
                      className="home-link"
                      to={{
                        pathname: `movies/${movie.id}`,
                        state: {
                          form: location,
                          label: 'Home page',
                        },
                      }}
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt={movie.title}
                          width="186"
                          height="279"
                        />
                      ) : (
                        <ImageError />
                      )}
                    </Link>
                  </li>
                ),
            )}
          </ul>

          <PaginationBox
            currentPage={page}
            count={trendMovies.total_pages}
            onChangePage={onChangePage}
          />
        </>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}
