//frontend/src/components/DisplaySpots/DisplaySpots.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './DisplaySpots.css'; // Import the CSS file for styling

const DisplaySpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchSpots(currentPage));
  }, [dispatch, currentPage]);

  // Ensure spots is an array before mapping
  const spotsArray = Object.values(spots);

  const lastSpotElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="spot-container">
      {spotsArray.map((spot, index) => {
        const spotTile = (
          <div className="spot-tile" title={spot.name}>
            <img src={spot.previewImage} alt={spot.name} className="spot-preview-img" />
            <div className="spot-details">
              <div className="city-state">{spot.city}, {spot.state}</div>
              <div className="price">${spot.price} night</div>
              <div className="rating">{spot.avgRating ? spot.avgRating : "New"}</div>
              <div className="name">{spot.name}</div>
            </div>
          </div>
        );

        if (spotsArray.length === index + 1) {
          return (
            <NavLink to={`/spots/${spot.id}`} key={spot.id} ref={lastSpotElementRef} className="spot-link">
              {spotTile}
            </NavLink>
          );
        } else {
          return (
            <NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-link">
              {spotTile}
            </NavLink>
          );
        }
      })}
    </div>
  );
};

export default DisplaySpots;