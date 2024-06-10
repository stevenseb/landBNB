import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot, addImageToSpot } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Validation logic
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
      const newSpot = {
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
        const createdSpot = await dispatch(createSpot(newSpot));
        if (createdSpot) {
          for (const url of imageUrls) {
            if (url) {
              await dispatch(addImageToSpot(createdSpot.id, url, url === imageUrls[0]));
            }
          }
          navigate(`/spots/${createdSpot.id}`);
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

  return (
    <div className="create-spot-form-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <h5>Where&apos;s your place located?</h5>
        <p className="black-text">Guests will only get your exact address once they booked a reservation.</p>
        <div className="form-group">
          <label className="black-text">Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          {errors.includes('Country is required') && <span className="error">Country is required</span>}
        </div>

        <div className="form-group">
          <label className="black-text">Street Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          {errors.includes('Address is required') && <span className="error">Address is required</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="black-text">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            {errors.includes('City is required') && <span className="error">City is required</span>}
          </div>
          <div className="form-group">
            <label className="black-text">State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            {errors.includes('State is required') && <span className="error">State is required</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="black-text">Latitude</label>
            <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
            {errors.includes('Latitude is required') && <span className="error">Latitude is required</span>}
          </div>
          <div className="form-group">
            <label className="black-text">Longitude</label>
            <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} />
            {errors.includes('Longitude is required') && <span className="error">Longitude is required</span>}
          </div>
        </div>
        <hr />
        <br />
        <h5>Describe your place to guests</h5>
        <p className="black-text">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.includes('Description needs 30 or more characters') && <span className="error">Description needs 30 or more characters</span>}
        <hr />
        <br />
        <h5>Create a title for your spot</h5>
        <p className="black-text">Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.includes('Name is required') && <span className="error">Name is required</span>}
        <hr />
        <br />
        <h5>Set a base price for your spot</h5>
        <p className="black-text">Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className="form-group price-group">
          <label className="black-text">$</label>
          <input type="text" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {errors.includes('Price per night is required') && <span className="error">Price per night is required</span>}
        <hr />
        <br />
        <p className="blue-text">***Image links must end with .png, .jpg, or .jpeg***</p>
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
        <div className="create-button-container">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;
