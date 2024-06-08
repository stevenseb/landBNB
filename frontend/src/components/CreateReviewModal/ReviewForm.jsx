// frontend/src/components/CreateReviewModal/ReviewForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './CreateReviewModal.css';

const ReviewForm = ({ spotId, closeModal, addNewReview }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
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
        const reviewPayload = {
          spotId,
          userId: user.id,
          review: comment,
          stars,
        };
        const newReview = await dispatch(createReview(reviewPayload));
        addNewReview(newReview);  // callback function passed as a prop
        closeModal();
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const handleStarClick = (rating) => {
    setStars(rating);
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
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <FontAwesomeIcon
                key={rating}
                icon={faStar}
                className={`star ${rating <= stars ? 'selected' : ''}`}
                onClick={() => handleStarClick(rating)}
              />
            ))}
          </div>
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
