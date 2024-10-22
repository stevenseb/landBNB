import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotDetails } from "../../store/spots";
import { fetchReviews, deleteReview } from "../../store/reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { selectSpotById, selectReviewsBySpotId } from "../../store/selectors";
import { useModal } from "../../context/Modal";
import ReviewForm from "../CreateReviewModal/ReviewForm";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../../store/bookings";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => selectSpotById(state, id));
  const reviews = useSelector((state) => selectReviewsBySpotId(state, id));
  const user = useSelector((state) => state.session.user);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const { setModalContent, closeModal } = useModal();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    dispatch(fetchSpotDetails(id));
    dispatch(fetchReviews(id));
    fetchBookings();
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (user && reviews.length > 0) {
      const hasReviewed = reviews.some((review) => review.userId === user.id);
      setUserHasReviewed(hasReviewed);
    }
  }, [user, reviews]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/spots/${id}/bookings`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched bookings:", data.Bookings); // For debugging
        const adjustedBookings = data.Bookings.map((booking) => ({
          ...booking,
          startDate: new Date(booking.startDate + "T00:00:00Z")
            .toISOString()
            .split("T")[0],
          endDate: new Date(booking.endDate + "T00:00:00Z")
            .toISOString()
            .split("T")[0],
        }));
        console.log("Adjusted bookings:", adjustedBookings); // For debugging
        setBookings(adjustedBookings);
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const addNewReview = async () => {
    setUserHasReviewed(true);
    dispatch(fetchReviews(id));
    dispatch(fetchSpotDetails(id));
  };

  if (!spot.id) return <div>Loading...</div>;

  const previewImage = spot.spotImages
    ? spot.spotImages.find((image) => image.preview)?.url
    : "";
  const otherImages = spot.spotImages
    ? spot.spotImages.filter((image) => !image.preview).slice(0, 4)
    : [];
  const owner = spot.owner || {};
  const numReviews = reviews.length;
  const avgRating =
    typeof spot.avgRating === "string"
      ? parseFloat(spot.avgRating).toFixed(1)
      : "New";

  const handleReserveClick = async () => {
    if (!user) {
      setBookingError("You must be logged in to make a booking");
      return;
    }
    if (!startDate || !endDate) {
      setBookingError("Please select both start and end dates");
      return;
    }
    const bookingData = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
    try {
      dispatch(createBooking(id, bookingData));
      setStartDate(null);
      setEndDate(null);
      setBookingError(null);
      fetchBookings();
      alert("Booking successful!");
    } catch (err) {
      setBookingError(err.message || "Failed to create booking");
    }
  };

  const handleReviewClick = () => {
    setModalContent(
      <ReviewForm
        spotId={spot.id}
        closeModal={closeModal}
        addNewReview={addNewReview}
      />
    );
  };

  const handleDeleteClick = (reviewId) => {
    setModalContent(
      <DeleteReviewModal
        onDelete={() => handleConfirmDelete(reviewId)}
        onCancel={closeModal}
      />
    );
  };

  const handleConfirmDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).then(() => {
      setUserHasReviewed(true);
      dispatch(fetchReviews(id));
      dispatch(fetchSpotDetails(id));
      closeModal();
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const shouldShowReviewButton =
    user && !userHasReviewed && user.id !== spot.ownerId;

  const isDateBooked = (date) => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  const getExcludedDates = () => {
    return bookings.flatMap((booking) => {
      const dates = [];
      let currentDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    });
  };

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <div className="location">
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <div className="images-container">
        <div className="main-image">
          {previewImage && (
            <img src={previewImage} alt={spot.name} className="large-img" />
          )}
        </div>
        <div className="small-images">
          {otherImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${spot.name} ${index + 1}`}
              className="small-img"
            />
          ))}
        </div>
      </div>
      <div className="details-container">
        <div className="host-description">
          <hr />
          <div className="hosted-by">
            Hosted by {owner.firstName} {owner.lastName}
          </div>
          <hr />
          <p className="description">{spot.description}</p>
        </div>
        <div className="callout-box">
          <div className="price-reviews">
            <div className="price">
              ${spot.price} <span>night</span>
            </div>
            <div className="reviews">
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              {avgRating}
              {numReviews > 0 && (
                <>
                  <span className="dot">•</span> {numReviews}{" "}
                  {numReviews === 1 ? "Review" : "Reviews"}
                </>
              )}
            </div>
          </div>
          <div className="booking-section">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Start Date"
              excludeDates={getExcludedDates()}
              filterDate={(date) => !isDateBooked(date)}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="custom-header">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <span className="month-year">
                    {date.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              excludeDates={getExcludedDates()}
              filterDate={(date) => !isDateBooked(date)}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="custom-header">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <span className="month-year">
                    {date.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
            {bookingError && <p className="error">{bookingError}</p>}
          </div>
          <button className="reserve-button" onClick={handleReserveClick}>
            Reserve
          </button>
        </div>
      </div>
      <hr style={{ marginTop: "20px" }} />
      <div className="rating">
        <FontAwesomeIcon icon={faStar} className="star-icon" />
        {avgRating}
        {numReviews > 0 && (
          <>
            <span className="dot">•</span> {numReviews}{" "}
            {numReviews === 1 ? "Review" : "Reviews"}
          </>
        )}
      </div>
      {shouldShowReviewButton && (
        <button className="post-review-button" onClick={handleReviewClick}>
          Post Your Review
        </button>
      )}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-author">
                {review.User?.firstName || "Anonymous"}
              </div>
              <div className="review-date">{formatDate(review.createdAt)}</div>
              <div className="review-content">{review.review}</div>
              {user && user.id === review.userId && (
                <button
                  className="delete-review-button"
                  onClick={() => handleDeleteClick(review.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : user && user.id !== spot.ownerId ? (
          <p>Be the first to post a review!</p>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
