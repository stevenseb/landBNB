import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpotDetails, updateSpot, addImageToSpot } from '../../store/spots';
import './UpdateSpotForm.css';

const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const spot = useSelector(state => state.spots[id]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchSpotDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (spot) {
      setAddress(spot.address || '');
      setCity(spot.city || '');
      setState(spot.state || '');
      setCountry(spot.country || '');
      setLat(spot.lat || '');
      setLng(spot.lng || '');
      setName(spot.name || '');
      setPrice(spot.price || '');
      setDescription(spot.description || '');
      const imageUrls = (spot.spotImages || []).map(image => image.url);
      setImageUrls([
        imageUrls[0] || '',
        imageUrls[1] || '',
        imageUrls[2] || '',
        imageUrls[3] || '',
        imageUrls[4] || '',
      ]);
    }
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Validation
    if (!address) validationErrors.push('Address is required');
    if (!city) validationErrors.push('City is required');
    if (!state) validationErrors.push('State is required');
    if (!country) validationErrors.push('Country is required');
    if (!name) validationErrors.push('Name is required');
    if (!price) validationErrors.push('Price per night is required');
    if (description.length < 30) validationErrors.push('Description needs 30 or more characters');
    if (!imageUrls[0]) validationErrors.push('Preview image is required');

    const imageRegex = /\.(jpg|jpeg|png)$/;
    imageUrls.forEach((url, index) => {
      if (url && !imageRegex.test(url)) {
        validationErrors.push(`Image URL ${index + 1} must end in .png, .jpg, or .jpeg`);
      }
    });

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      const updatedSpot = {
        id: spot.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        description,
      };

      try {
        const updated = await dispatch(updateSpot(updatedSpot));
        if (updated) {
          for (const url of imageUrls) {
            if (url) {
              await dispatch(addImageToSpot(updated.id, url, url === imageUrls[0]));
            }
          }
          navigate(`/spots/${updated.id}`);
        }
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleCancel = () => {
    navigate('/manage-spots');
  };

  return (
    <div className="update-spot-form-container">
      <h1>Update Your Spot</h1>
      <form onSubmit={handleSubmit}>
        <h5>Where&apos;s your place located?</h5>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <div className="form-group">
          <label>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          {errors.includes('Country is required') && <span className="error">Country is required</span>}
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          {errors.includes('Address is required') && <span className="error">Address is required</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            {errors.includes('City is required') && <span className="error">City is required</span>}
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            {errors.includes('State is required') && <span className="error">State is required</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
            {errors.includes('Latitude is required') && <span className="error">Latitude is required</span>}
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} />
            {errors.includes('Longitude is required') && <span className="error">Longitude is required</span>}
          </div>
        </div>
        <hr />
        <br />
        <h5>Describe your place to guests</h5>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.includes('Description needs 30 or more characters') && <span className="error">Description needs 30 or more characters</span>}
        <hr />
        <br />
        <h5>Create a title for your spot</h5>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.includes('Name is required') && <span className="error">Name is required</span>}
        <hr />
        <br />
        <h5>Set a base price for your spot</h5>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className="form-group price-group">
          <label>$</label>
          <input type="text" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {errors.includes('Price per night is required') && <span className="error">Price per night is required</span>}
        <hr />
        <br />
        {imageUrls.map((url, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />
            {index === 0 && errors.includes('Preview image is required') && <span className="error">Preview image is required</span>}
            {errors.includes(`Image URL ${index + 1} must end in .png, .jpg, or .jpeg`) && <span className="error">Image URL must end in .png, .jpg, or .jpeg</span>}
          </div>
        ))}
        <hr />
        <div className="update-button-container">
          <button type="submit">Update Spot</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSpotForm;
