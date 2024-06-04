import { csrfFetch } from './csrf';

// Action types
const SET_SPOTS = 'spots/setSpots';
const SET_SPOT = 'spots/setSpot';
const ADD_SPOT = 'spots/addSpot';
const ADD_IMAGE = 'spots/addImage';

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

// Thunks
export const fetchSpots = (page) => async (dispatch) => {
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
    if (data && data.id) {
      dispatch(setSpot(data));
    } else {
      console.error('Expected spot details');
    }
  } catch (error) {
    console.error('Failed to fetch spot details:', error);
  }
};

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

// Reducer
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
    default:
      return state;
  }
};

export default spotsReducer;
