import { csrfFetch } from './csrf';

// Action types
const SET_SPOTS = 'spots/setSpots';
const SET_SPOT = 'spots/setSpot';

// Action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
});

// Thunks
export const fetchSpots = (page = 1) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots?=${page}`);
  const data = await response.json();
  const spotsArray = data.Spots;

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

export const fetchSpotDetails = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${id}`);
    const data = await response.json();
    console.log('Spot Details API Response:', data); // Log the API response for debugging
    if (data && data.id) {
      console.log('Dispatching spot data:', data);
      dispatch(setSpot(data));
    } else {
      console.error('Expected spot details');
    }
  } catch (error) {
    console.error('Failed to fetch spot details:', error);
  }
};

// Reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, ...action.spots };
    case SET_SPOT:
      if (action.spot && action.spot.id) {
        return { ...state, [action.spot.id]: action.spot };
      } else {
        console.error('Invalid spot data:', action.spot);
        return state;
      }
    default:
      return state;
  }
};

export default spotsReducer;
