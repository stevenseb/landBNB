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

const initialState = { reviews: [] };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, reviews: action.reviews };
    case ADD_REVIEW:
      return { ...state, reviews: [action.review, ...state.reviews] };
    case DELETE_REVIEW:
      return { ...state, reviews: state.reviews.filter(review => review.id !== action.reviewId) };
    default:
      return state;
  }
};

export default reviewsReducer;
