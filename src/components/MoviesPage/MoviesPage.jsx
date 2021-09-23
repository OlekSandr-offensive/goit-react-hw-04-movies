import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchSerchMovies } from '../../fetch-service';
import '../MoviesPage/MoviesPage.scss';

export default function MoviesPage() {
  const { url } = useRouteMatch();

  useEffect(() => {
    const fetchSearch = async function () {
      try {
        const data = await fetchSerchMovies();
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
