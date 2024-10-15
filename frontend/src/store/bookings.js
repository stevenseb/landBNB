// store/bookings.js
import { csrfFetch } from "./csrf";
// Action Types
const CREATE_BOOKING = "bookings/CREATE_BOOKING";

// Action Creators
const setBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

// Thunk Action Creators
export const createBooking = (spotId, bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ spotId, ...bookingData }),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(setBooking(booking));
    return booking;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

// Reducer
const initialState = {};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOKING:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
