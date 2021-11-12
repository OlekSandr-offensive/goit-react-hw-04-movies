import React from 'react';
import { useState, useEffect } from 'react';
import { fetchSerchMovies } from '../../fetch-service';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../MoviesPage/MoviesPage.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage({ loader }) {
  const [searchMovies, setSearchMovies] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [listMovies, setListMovies] = useState(null);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchSearch = async function () {
      try {
        const response = await fetchSerchMovies(searchMovies);
        setStatus(Status.RESOLVED);
        setListMovies(response.results);
        setMovieName('');
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchSearch();
  }, [searchMovies]);

  const handleNameChange = event => {
    setMovieName(event.currentTarget.value.toLowerCase());
  };

  const handleSabmit = event => {
    event.preventDefault();

    if (movieName.trim() === '') {
      toast.error('Enter a name for the picture!');
      return;
    }
    setSearchMovies(movieName);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      {Status.PENDING && spinner && loader}
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
      {Status.RESOLVED && listMovies && (
        <ul>
          {listMovies.map(({ original_title, id }) => (
            <li key={id}>{original_title}</li>
          ))}
        </ul>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}
