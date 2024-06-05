// src/selectors.js
import { createSelector } from 'reselect';

export const selectSpotById = createSelector(
  (state, id) => state.spots[id] || {},
  (spot) => spot
);

export const selectReviewsBySpotId = createSelector(
  (state, id) => state.spots[id]?.reviews || [],
  (reviews) => reviews
);
