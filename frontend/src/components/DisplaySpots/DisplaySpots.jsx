import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './DisplaySpots.css';
import placeholderImage from '../../../assets/coming-soon.jpg';

const DisplaySpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreSpots, setMoreSpots] = useState(true); // for infinite scroll to flag when no more spots to fetch
  const observer = useRef();
  const [imageLoadedState, setImageLoadedState] = useState({}); // State to manage image load status

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchSpots(currentPage));
      if (!response || response.length === 0) {
        setMoreSpots(false);
      }
    };

    if (moreSpots) {
      fetchData();
    }
  }, [dispatch, currentPage, moreSpots]);

  const spotsArray = Object.values(spots);

  const lastSpotElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && moreSpots) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [moreSpots]);

  const handleImageLoad = (id) => {
    setImageLoadedState(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  return (
    <div className="spot-container">
      {spotsArray.map((spot, index) => {
        if (!spot.id) return null; // don't render if spot is undefined

        const previewImage = spot.previewImage || placeholderImage;
        const imageLoaded = imageLoadedState[spot.id] || false;

        const spotTile = (
          <div className="spot-tile" title={spot.name} key={spot.id}>
            <img
              src={previewImage}
              alt={spot.name}
              className={`spot-preview-img ${!imageLoaded && 'placeholder'}`}
              onLoad={() => handleImageLoad(spot.id)}
              onError={(e) => {
                e.target.src = placeholderImage;
                e.target.classList.add('placeholder');
              }}
            />
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
