import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSerchMovies } from '../../fetch-service';
import '../MoviesPage/MoviesPage.scss';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [searchMovies, setSearchMovies] = useState(null);

  useEffect(() => {
    const fetchSearch = async function () {
      try {
        const response = await fetchSerchMovies('bond');
        console.log(response);
      } catch (error) {
      } finally {
      }
    };

    fetchSearch();
  }, []);

  return (
    <div>
      <form className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="imageName"
          // autocomplete="off"
          // autofocus
          placeholder="Search movies"
          // value={}
          // onChange={}
        />
      </form>
    </div>
  );
}
