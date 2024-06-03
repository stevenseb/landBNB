import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(state => state.spots[id]);

  useEffect(() => {
    console.log('Fetching spot details for id:', id);
    dispatch(fetchSpotDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (spot) {
      console.log('Spot Details:', spot);
      if (spot.spotImages) {
        const previewImage = spot.spotImages.find(image => image.preview)?.url;
        const otherImages = spot.spotImages.filter(image => !image.preview).slice(0, 4);
        console.log('Preview Image URL:', previewImage);
        console.log('Other Image URLs:', otherImages.map(image => image.url));
      }
    }
  }, [spot]);

  if (!spot) return <div>Loading...</div>;

  const previewImage = spot.spotImages ? spot.spotImages.find(image => image.preview)?.url : '';
  const otherImages = spot.spotImages ? spot.spotImages.filter(image => !image.preview).slice(0, 4) : [];
  const owner = spot.owner || {};

  const handleReserveClick = () => {
    alert('Feature coming soon');
  };

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
      <div className="hosted-by">
        Hosted by {owner.firstName} {owner.lastName}
      </div>
      <p className="description">{spot.description}</p>
      <div className="callout-box">
        <div className="price">
          ${spot.price} <span>night</span>
        </div>
        <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetails;
