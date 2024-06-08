// src/selectors.js
import { createSelector } from 'reselect';

export const selectSpotById = createSelector(
  (state, id) => state.spots[id] || {},
  (spot) => spot
);

export const selectReviewsBySpotId = createSelector(
  (state, id) => {
    const reviewIds = state.reviews.bySpotId[id] || [];
    return reviewIds.map((reviewId) => state.reviews.byId[reviewId]);
  },
  (reviews) => reviews
);
