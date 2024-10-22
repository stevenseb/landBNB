// store/bookings.js
import { csrfFetch } from "./csrf";

// Action Types
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const SET_USER_BOOKINGS = "bookings/SET_USER_BOOKINGS";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const REMOVE_BOOKING = "bookings/REMOVE_BOOKING";

// Action Creators
const setBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

const setUserBookings = (bookings) => ({
  type: SET_USER_BOOKINGS,
  payload: bookings,
});

const updateBookingAction = (booking) => ({
  type: UPDATE_BOOKING,
  payload: booking,
});

const removeBookingAction = (bookingId) => ({
  type: REMOVE_BOOKING,
  payload: bookingId,
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

export const fetchUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  if (response.ok) {
    const bookings = await response.json();
    dispatch(setUserBookings(bookings.Bookings));
    return bookings;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const updateBooking = (bookingId, bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(updateBookingAction(updatedBooking));
    return updatedBooking;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeBookingAction(bookingId));
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

// Reducer
const initialState = {
  userBookings: [],
};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOKING:
      return {
        ...state,
        userBookings: [...state.userBookings, action.payload],
      };
    case SET_USER_BOOKINGS:
      return { ...state, userBookings: action.payload };
    case UPDATE_BOOKING:
      return {
        ...state,
        userBookings: state.userBookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        ),
      };
    case REMOVE_BOOKING:
      return {
        ...state,
        userBookings: state.userBookings.filter(
          (booking) => booking.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
