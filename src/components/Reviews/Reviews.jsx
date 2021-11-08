import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMoviesReviews } from '../../fetch-service';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Reviews({ loader }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    setSpinner(true);
    const fetchReviews = async function () {
      try {
        const response = await fetchMoviesReviews(movieId);
        setStatus(Status.RESOLVED);
        setReviews(response.reviews);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
      } finally {
        setSpinner(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {Status.PENDING && spinner && loader}
      {Status.REJECTED && reviews && (
        <ul>
          {reviews.map(review => (
            <>
              <li key={review.id}>
                {
                  <div>
                    <h3 className="cast-name">{review.author}</h3>
                    <p className="cast-character">{review.content}</p>
                  </div>
                }
              </li>
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

export default Reviews;
