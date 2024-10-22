import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchUserBookings, deleteBooking } from "../../store/bookings"; // You'll need to create these actions
import styles from "./Bookings.module.css";

const Bookings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userBookings = useSelector(
    (state) => state.bookings.userBookings || []
  );
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (bookingId) => {
    setBookingToDelete(bookingId);
  };

  const confirmDelete = async () => {
    try {
      dispatch(deleteBooking(bookingToDelete));
      setBookingToDelete(null);
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleUpdate = (bookingId) => {
    console.log(`Edit booking ${bookingId}`);
  };

  if (!userBookings.length) {
    return (
      <div className="bookings-container">
        <h1>Your Bookings</h1>
        <p>You have no bookings yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Your Bookings</h1>
      <div className={styles.list}>
        {userBookings.map((booking) => (
          <div className={styles.item} key={booking.id}>
            <div className={styles.dates}>
              <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
            </div>
            <NavLink
              to={`/spots/${booking.Spot.id}`}
              className={styles.spotLink}
            >
              <div className={styles.spotDetails}>
                <img
                  src={booking.Spot.previewImage}
                  alt={booking.Spot.name}
                  className={styles.previewImg}
                />
                <div className={styles.spotInfo}>
                  <h3>{booking.Spot.name}</h3>
                  <p>
                    {booking.Spot.city}, {booking.Spot.state}
                  </p>
                  <div className={styles.avgRating}>
                    <FontAwesomeIcon
                      icon={faStar}
                      className={styles.starIcon}
                    />
                    {booking.Spot.avgRating
                      ? booking.Spot.avgRating.toFixed(1)
                      : "New"}
                  </div>
                  <p>${booking.Spot.price} / night</p>
                </div>
              </div>
            </NavLink>
            <div className={styles.actions}>
              <button onClick={() => handleUpdate(booking.id)}>
                Edit Booking
              </button>
              <button onClick={() => handleDelete(booking.id)}>
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
      {bookingToDelete && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2 className="delete-warning">
              Are you sure you want to cancel this booking? This can&apos;t be
              reversed!
            </h2>
            <button onClick={confirmDelete} className="confirm-delete-button">
              Yes, cancel booking
            </button>
            <button
              onClick={() => setBookingToDelete(null)}
              className="cancel-delete-button"
            >
              No, keep booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
