// frontend/src/components/CreateReviewModal/ReviewForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, fetchReviews } from '../../store/reviews';
import './ReviewForm.css';

const ReviewForm = ({ spotId, closeModal }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (comment.length < 10) {
      validationErrors.push('Review must be at least 10 characters');
    }

    if (stars === 0) {
      validationErrors.push('Rating must be at least 1 star');
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        await dispatch(createReview({ spotId, review: comment, stars }));
        dispatch(fetchReviews(spotId));
        closeModal();
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  return (
    <div className="review-form-container">
      <h2>How was your stay?</h2>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your review here..."
        ></textarea>
        <div className="stars-input">
          <label htmlFor="stars">Stars</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
            min="1"
            max="5"
          />
        </div>
        <button
          type="submit"
          disabled={comment.length < 10 || stars === 0}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
