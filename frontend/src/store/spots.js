// frontend/src/store/spots.js
import { csrfFetch } from './csrf';

// Action types
const SET_SPOTS = 'spots/setSpots';

// Action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

// Thunks
export const fetchSpots = (page = 1) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots?=${page}`);
  const data = await response.json();
  console.log('API Response:', data); /// debugging

  const spotsArray = data.Spots; // Extract the spots array from the response object

  if (Array.isArray(spotsArray)) {
    const normalizedSpots = {};
    spotsArray.forEach(spot => {
      normalizedSpots[spot.id] = spot;
    });
    dispatch(setSpots(normalizedSpots));
  } else {
    console.error('Expected spots to be an array');
  }
};

// Reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, ...action.spots };
    default:
      return state;
  }
};

export default spotsReducer;
