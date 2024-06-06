// frontend/src/store/store.js

import { csrfFetch } from './csrf';

// Action types
const SET_SPOTS = 'spots/setSpots';
const SET_SPOT = 'spots/setSpot';
const ADD_SPOT = 'spots/addSpot';
const ADD_IMAGE = 'spots/addImage';
const SET_USER_SPOTS = 'spots/setUserSpots';
const REMOVE_SPOT = 'spots/removeSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const SET_REVIEWS = 'spots/setReviews';

// Action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image,
});

const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  spots,
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

const setReviews = (spotId, reviews) => ({
  type: SET_REVIEWS,
  spotId,
  reviews,
});


// Thunk to fetch spots
export const fetchSpots = (page) => async (dispatch, getState) => {
  const response = await csrfFetch(`/api/spots?page=${page}`);
  const data = await response.json();
  const spotsArray = data.Spots;

  if (Array.isArray(spotsArray)) {
    const normalizedSpots = {};
    spotsArray.forEach((spot) => {
      normalizedSpots[spot.id] = spot;
    });
    const currentSpots = getState().spots;
    dispatch(setSpots({ ...currentSpots, ...normalizedSpots }));
    return spotsArray;
  } else {
    console.error('Expected spots to be an array');
    return [];
  }
};

// Thunk to fetch spot details by id
export const fetchSpotDetails = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${id}`);
    const data = await response.json();
    if (data && data.id) {
      dispatch(setSpot(data));
    } else {
      console.error('Expected spot details');
    }
  } catch (error) {
    console.error('Failed to fetch spot details:', error);
  }
};

// Thunk to create a new spot
export const createSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create spot');
  }
};

// Thunk to add an image to a spot
export const addImageToSpot = (spotId, url, preview) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, preview }),
  });

  if (response.ok) {
    const newImage = await response.json();
    dispatch(addImage(newImage));
    return newImage;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add image');
  }
};

// Thunk to fetch spots for current user
export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  const data = await response.json();
  dispatch(setUserSpots(data.Spots));
};

// Thunk to delete a spot by owner
export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(removeSpot(spotId));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete spot');
  }
};

// Thunk to update a spot
export const updateSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpotAction(updatedSpot));
    return updatedSpot;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update spot');
  }
};

// Thunk to fetch reviews by spot id
export const fetchReviews = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(setReviews(spotId, data.Reviews));
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS: {
      return { ...state, ...action.spots };
    }
    case SET_SPOT: {
      return { ...state, [action.spot.id]: action.spot };
    }
    case ADD_SPOT: {
      return { ...state, [action.spot.id]: action.spot };
    }
    case ADD_IMAGE: {
      const spot = state[action.image.spotId];
      if (spot) {
        return {
          ...state,
          [action.image.spotId]: {
            ...spot,
            images: [...(spot.images || []), action.image],
          },
        };
      } else {
        return state;
      }
    }
    case SET_USER_SPOTS: {
      return { ...state, userSpots: action.spots };
    }
    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];

      if (newState.userSpots) {
        newState.userSpots = newState.userSpots.filter((spot) => spot.id !== action.spotId);
      }
      return newState;
    }
    case UPDATE_SPOT: {
      return { ...state, [action.spot.id]: action.spot };
    }
    case SET_REVIEWS: {
      const newState = { ...state };
      newState[action.spotId] = {
        ...newState[action.spotId],
        reviews: action.reviews,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
