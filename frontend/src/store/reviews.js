// src/store/reviews.js
import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators
const loadReviews = (spotId, reviews) => ({
  type: LOAD_REVIEWS,
  spotId,
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
    const { Reviews: reviews } = await response.json();
    dispatch(loadReviews(spotId, reviews));
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

const initialState = { bySpotId: {}, byId: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = { ...state };
      const reviewsById = {};
      action.reviews.forEach((review) => {
        reviewsById[review.id] = review;
      });
      newState.bySpotId[action.spotId] = action.reviews.map((review) => review.id);
      newState.byId = { ...newState.byId, ...reviewsById };
      return newState;
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      const spotId = action.review.spotId;
      newState.byId[action.review.id] = action.review;
      newState.bySpotId[spotId] = [...(newState.bySpotId[spotId] || []), action.review.id];
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      const reviewId = action.reviewId;
      for (const spotId in newState.bySpotId) {
        newState.bySpotId[spotId] = newState.bySpotId[spotId].filter((id) => id !== reviewId);
      }
      delete newState.byId[reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
