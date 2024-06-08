// frontend/src/store/reviews.js
import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators
const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunk to fetch reviews
export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  }
};

// Thunk to create review
export const createReview = (review) => async (dispatch) => {
  const { spotId, userId, review: comment, stars } = review;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ userId, review: comment, stars }),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  }
  const error = await response.json();
  throw new Error(error.message);
};

// Thunk to delete review
export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReviewAction(reviewId));
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

const initialState = { bySpotId: {}, byReviewId: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const bySpotId = { ...state.bySpotId };
      const byReviewId = { ...state.byReviewId };
      if (action.reviews.length > 0) {
        const spotId = action.reviews[0].spotId;
        bySpotId[spotId] = action.reviews.map(review => review.id);
        action.reviews.forEach(review => {
          byReviewId[review.id] = review;
        });
      }
      return { ...state, bySpotId, byReviewId };
    }
    case ADD_REVIEW: {
      const bySpotId = { ...state.bySpotId };
      const byReviewId = { ...state.byReviewId };
      const spotId = action.review.spotId;
      bySpotId[spotId] = [...(bySpotId[spotId] || []), action.review.id];
      byReviewId[action.review.id] = action.review;
      return { ...state, bySpotId, byReviewId };
    }
    case DELETE_REVIEW: {
      const bySpotId = { ...state.bySpotId };
      const byReviewId = { ...state.byReviewId };
      Object.keys(bySpotId).forEach(spotId => {
        bySpotId[spotId] = bySpotId[spotId].filter(reviewId => reviewId !== action.reviewId);
      });
      delete byReviewId[action.reviewId];
      return { ...state, bySpotId, byReviewId };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
