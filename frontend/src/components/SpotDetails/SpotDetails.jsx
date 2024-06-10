import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots';
import { fetchReviews } from '../../store/reviews';
import { deleteReview } from '../../store/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { selectSpotById, selectReviewsBySpotId } from '../../store/selectors';
import { useModal } from '../../context/Modal';
import ReviewForm from '../CreateReviewModal/ReviewForm';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => selectSpotById(state, id));
  const reviews = useSelector((state) => selectReviewsBySpotId(state, id));
  const user = useSelector((state) => state.session.user);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchSpotDetails(id));
    dispatch(fetchReviews(id));
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

  const addNewReview = async () => {
    setUserHasReviewed(true);
    await dispatch(fetchReviews(id));
    await dispatch(fetchSpotDetails(id));
  };

  if (!spot.id) return <div>Loading...</div>;

  const previewImage = spot.spotImages ? spot.spotImages.find((image) => image.preview)?.url : '';
  const otherImages = spot.spotImages ? spot.spotImages.filter((image) => !image.preview).slice(0, 4) : [];
  const owner = spot.owner || {};
  const numReviews = reviews.length;
  const avgRating = typeof spot.avgRating === 'string' ? parseFloat(spot.avgRating).toFixed(1) : 'New';

  const handleReserveClick = () => {
    alert('Feature coming soon');
  };

  const handleReviewClick = () => {
    setModalContent(<ReviewForm spotId={spot.id} closeModal={closeModal} addNewReview={addNewReview} />);
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
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const shouldShowReviewButton = user && !userHasReviewed && user.id !== spot.ownerId;

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <div className="location">{spot.city}, {spot.state}, {spot.country}</div>
      <div className="images-container">
        <div className="main-image">
          {previewImage && <img src={previewImage} alt={spot.name} className="large-img" />}
        </div>
        <div className="small-images">
          {otherImages.map((image, index) => (
            <img key={index} src={image.url} alt={`${spot.name} ${index + 1}`} className="small-img" />
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
                  <span className="dot">•</span> {numReviews} {numReviews === 1 ? 'Review' : 'Reviews'}
                </>
              )}
            </div>
          </div>
          <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
        </div>
      </div>
      <hr style={{ marginTop: '20px' }} />
      <div className="rating">
        <FontAwesomeIcon icon={faStar} className="star-icon" />
        {avgRating}
        {numReviews > 0 && (
          <>
            <span className="dot">•</span> {numReviews} {numReviews === 1 ? 'Review' : 'Reviews'}
          </>
        )}
      </div>
      {shouldShowReviewButton && (
        <button className="post-review-button" onClick={handleReviewClick}>Post Your Review</button>
      )}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-author">{review.User?.firstName || 'Anonymous'}</div>
              <div className="review-date">{formatDate(review.createdAt)}</div>
              <div className="review-content">{review.review}</div>
              {user && user.id === review.userId && (
                <button className="delete-review-button" onClick={() => handleDeleteClick(review.id)}>Delete</button>
              )}
            </div>
          ))
        ) : (
          user && user.id !== spot.ownerId ? (
            <p>Be the first to post a review!</p>
          ) : (
            <p>No reviews yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
