import React from 'react';
import { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import {
  Link,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMoviesById } from '../../services/fetch-service';
import ImageError from '../../components/ImageError/ImageError';
import '../MovieDetailsPage/MovieDetailsPage.scss';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast.jsx' /* webpackChunkName: "MovieCast"*/),
);

const Reviews = lazy(() =>
  import(
    '../../components/Reviews/Reviews.jsx' /* webpackChunkName: "ReviewsCast"*/
  ),
);

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage({ loader }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchMoviePage = async function () {
      try {
        const response = await fetchMoviesById(movieId);
        setStatus(Status.RESOLVED);
        setMovie(response);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchMoviePage();
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.form ?? '/');
  };

  return (
    <>
      {Status.PENDING && spinner && loader}
      {Status.RESOLVED && movie && (
        <>
          <div className="movie-detail-container">
            <button className="btn" type="button" onClick={onGoBack}>
              {location?.state?.label ?? 'Go back'}
            </button>

            <div className="movie-detail">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  width="200"
                  alt={movie.title}
                />
              ) : (
                <ImageError />
              )}
              <div className="movie-detail-info">
                <h1>{`${movie.title}`}</h1>
                <p>{movie.release_date}</p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <ul>
                  {movie.genres.map(genre => {
                    return <li key={genre.id}>{genre.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="movie-detail-footer">
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link
                  className="link"
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      form: location?.state?.form ?? 'Go back',
                      label: location?.state?.label ?? 'Go back',
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      form: location?.state?.form ?? 'Go back',
                      label: location?.state?.label ?? 'Go back',
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense
            fallback={
              <>
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000}
                  style={{ textAlign: 'center', marginTop: '100px' }}
                />
              </>
            }
          >
            <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
            <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
          </Suspense>
        </>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}
