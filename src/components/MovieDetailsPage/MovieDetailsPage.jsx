import React from 'react';
import { useState, useEffect } from 'react';
import {
  Link,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMoviesById } from '../../fetch-service';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import '../MovieDetailsPage/MovieDetailsPage.scss';

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
  console.log(location);

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
    history.push(location.state.from);
  };

  return (
    <>
      {Status.PENDING && spinner && loader}
      {Status.RESOLVED && movie && (
        <>
          <div className="movie-detail-container">
            <button className="btn" type="button" onClick={onGoBack}>
              Go back
            </button>

            <div className="movie-detail">
              <img
                className="image"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                width="200"
                alt={movie.title}
              />
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
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
          <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
        </>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}
