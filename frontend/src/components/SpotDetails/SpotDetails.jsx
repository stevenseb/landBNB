import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotDetails, fetchReviews } from '../../store/spots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(state => state.spots[id]);
  const reviews = useSelector(state => state.spots[id]?.reviews || []);
  const user = useSelector(state => state.session.user);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotDetails(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && reviews.length > 0) {
      const hasReviewed = reviews.some(review => review.userId === user.id);
      setUserHasReviewed(hasReviewed);
    }
  }, [user, reviews]);

  if (!spot) return <div>Loading...</div>;

  const previewImage = spot.spotImages ? spot.spotImages.find(image => image.preview)?.url : '';
  const otherImages = spot.spotImages ? spot.spotImages.filter(image => !image.preview).slice(0, 4) : [];
  const owner = spot.owner || {};
  const avgRating = spot.avgRating ? spot.avgRating : "New";
  const numReviews = spot.numReviews || 0;

  const handleReserveClick = () => {
    alert('Feature coming soon');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

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
          <div className="hosted-by">
            Hosted by {owner.firstName} {owner.lastName}
          </div>
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
      <hr />
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
        <button className="post-review-button">Post Your Review</button>
      )}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-author">{review.User.firstName}</div>
              <div className="review-date">{formatDate(review.createdAt)}</div>
              <div className="review-content">{review.review}</div>
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
