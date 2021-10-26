import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMoviesCredits } from '../../fetch-service';
import '../Cast/Cast.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Cast({ loader }) {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchMovieCast = async function () {
      try {
        const response = await fetchMoviesCredits(movieId);
        setStatus(Status.RESOLVED);
        setCast(response.cast);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {Status.PENDING && spinner && loader}
      {Status.RESOLVED && cast && (
        <ul>
          {cast.map(cast => (
            <>
              {cast.profile_path && (
                <li key={cast.id}>
                  {
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                        width="100"
                        alt={cast.name}
                      />
                      <h3 className="cast-name">{cast.name}</h3>
                      <p className="cast-character">
                        Character: {cast.character}
                      </p>
                    </div>
                  }
                </li>
              )}
            </>
          ))}
        </ul>
      )}
      {Status.REJECTED && error && (
        <p className="home-error">This text has already been found!</p>
      )}
    </>
  );
}

export default Cast;
