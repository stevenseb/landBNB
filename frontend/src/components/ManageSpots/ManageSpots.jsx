import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUserSpots, deleteSpot } from '../../store/spots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const userSpots = useSelector(state => state.spots.userSpots || []);
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSpots(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
    setSpotToDelete(null);
  };

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const openDeleteModal = (spot) => {
    setSpotToDelete(spot);
  };

  const closeDeleteModal = () => {
    setSpotToDelete(null);
  };

  if (!userSpots.length) {
    return (
      <div className="manage-spots-container">
        <h1>Manage Spots</h1>
        <NavLink to="/spots/new">Create a New Spot</NavLink>
      </div>
    );
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      <div className="spot-container">
        {userSpots.map(spot => (
          <div className="spot-tile" key={spot.id}>
            <NavLink to={`/spots/${spot.id}`} className="spot-link">
              <img src={spot.previewImage} alt={spot.name} className="spot-preview-img" />
              <div className="spot-details">
                <div className="location-rating">
                  <div className="location">{spot.city}, {spot.state}</div>
                  <div className="avg-rating">
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    {spot.avgRating ? spot.avgRating : "New"}
                  </div>
                </div>
                <div className="price">${spot.price} night</div>
              </div>
            </NavLink>
            <div className="spot-actions">
              <button onClick={() => handleUpdate(spot.id)}>Update</button>
              <button onClick={() => openDeleteModal(spot)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {spotToDelete && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <p className="delete-warning">Are you sure you want to delete {spotToDelete.name} permanently? This can&apos;t be reversed!</p>
            <button onClick={() => handleDelete(spotToDelete.id)} className="confirm-delete-button">Confirm Delete</button>
            <button onClick={closeDeleteModal} className="cancel-delete-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
