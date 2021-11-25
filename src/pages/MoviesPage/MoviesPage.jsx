import React from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSerchMovies } from '../../services/fetch-service';
import ImageError from '../../components/ImageError/ImageError';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../MoviesPage/MoviesPage.scss';
import PaginationBox from '../../components/PaginationBox/PaginationBox';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage({ loader }) {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [searchMovies] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [listMovies, setListMovies] = useState(null);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [page, setPage] = useState(1);
  const [, setStatus] = useState(Status.PENDING);

  const saveList = new URLSearchParams(location.search).get(`query`);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchSearch = async function () {
      try {
        if (saveList) {
          const response = await fetchSerchMovies(saveList, page);

          if (response.total_pages < 1) {
            setError(`Dont found this text < ${saveList} >`);
            setStatus(Status.REJECTED);
            return;
          }
          setStatus(Status.RESOLVED);
          setPage(response.page);
          setListMovies(response);
          setMovieName('');
          return response;
        } else {
          setStatus(Status.IDLE);
        }
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchSearch();
  }, [searchMovies, saveList, page]);

  const handleNameChange = event => {
    setMovieName(event.currentTarget.value.toLowerCase());
  };

  const handleSabmit = event => {
    event.preventDefault();

    if (movieName.trim() === '') {
      toast.error('Enter a name for the picture!');
      return;
    }
    history.push({
      ...location,
      search: `query=${movieName}`,
    });

    setMovieName('');
  };

  const onChangePage = page => {
    setPage(page);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <form className="SearchForm" onSubmit={handleSabmit}>
        <button type="submit" className="SearchForm-button"></button>

        <input
          className="SearchForm-input"
          type="text"
          name="film"
          placeholder="Search movies"
          value={movieName}
          onChange={handleNameChange}
        />
      </form>

      {Status.PENDING && spinner && loader}
      {Status.RESOLVED && listMovies && (
        <>
          <ul className="movie-collection">
            {listMovies.results.map(({ original_title, id, poster_path }) => (
              <li key={id}>
                <Link
                  className="home-link"
                  to={{
                    pathname: `${url}/${id}`,
                    state: {
                      form: location,
                      label: 'Movies page',
                    },
                  }}
                >
                  {poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                      alt={original_title}
                      width="186"
                      height="279"
                    />
                  ) : (
                    <ImageError />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <PaginationBox
            currentPage={page}
            count={listMovies.total_pages}
            onChangePage={onChangePage}
          />
        </>
      )}
      {Status.REJECTED && error && <h1 className="movie-error">{error}</h1>}
    </>
  );
}
