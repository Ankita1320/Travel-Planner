import React, { useState } from 'react';

const Destination = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);

  const handleChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination) {
      setDestinations([...destinations, destination]);
      setDestination('');
    }
  };

  return (
    <div>
      <h1>Destinations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Add Destination:
          <input type="text" value={destination} onChange={handleChange} required />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {destinations.map((dest, index) => (
          <li key={index}>{dest}</li>
        ))}
      </ul>
    </div>
  );
}

export default Destination;
