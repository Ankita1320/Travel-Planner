import React, { useState, useEffect } from 'react';

const TripPlanner = () => {
  // Initialize state for trip data and itinerary items
  const [tripData, setTripData] = useState({
    id: '',
    destination: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [itineraryItems, setItineraryItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [trips, setTrips] = useState([]);

  // Predefined itinerary suggestions based on destination
  const itinerarySuggestions = {
    'Paris': ['Visit Eiffel Tower', 'Louvre Museum Tour', 'Seine River Cruise'],
    'New York': ['Statue of Liberty Tour', 'Times Square Visit', 'Central Park Walk'],
    'Tokyo': ['Visit Shibuya Crossing', 'Tokyo Disneyland', 'Senso-ji Temple Tour']
    // Add more suggestions as needed
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing trip
      const updatedTrips = trips.map((trip) =>
        trip.id === tripData.id ? tripData : trip
      );
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    } else {
      // Add new trip
      const newTrip = {
        id: Date.now(),
        destination: tripData.destination,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        notes: tripData.notes,
        itinerary: itineraryItems
      };
      const updatedTrips = [...trips, newTrip];
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
    }
    // Reset form and state
    setTripData({
      id: '',
      destination: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
    setItineraryItems([]);
    setEditMode(false);
  };

  // Function to handle adding an itinerary item
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItineraryItems([...itineraryItems, newItem]);
      setNewItem('');
    }
  };

  // Function to handle removing an itinerary item
  const handleRemoveItem = (index) => {
    const updatedItems = [...itineraryItems];
    updatedItems.splice(index, 1);
    setItineraryItems(updatedItems);
  };

  // Function to handle editing a trip
  const handleEditTrip = (selectedTrip) => {
    setTripData(selectedTrip);
    setItineraryItems(selectedTrip.itinerary);
    setEditMode(true);
  };

  // Function to handle deleting a trip
  const handleDeleteTrip = (tripId) => {
    const filteredTrips = trips.filter((trip) => trip.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(filteredTrips));
    setTrips(filteredTrips);
  };

  // Function to suggest predefined itinerary items based on destination
  const handleSuggestItinerary = () => {
    const suggestions = itinerarySuggestions[tripData.destination];
    if (suggestions) {
      setItineraryItems([...itineraryItems, ...suggestions]);
    }
  };

  // Load trips from local storage on component mount
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setTrips(storedTrips);
  }, []);

  return (
    <div className="trip-planner-container">
      <h1>Trip Planner</h1>
      <form onSubmit={handleSubmit} className="trip-form">
        <label>
          Destination:
          <input type="text" name="destination" value={tripData.destination} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Start Date:
          <input type="date" name="startDate" value={tripData.startDate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" name="endDate" value={tripData.endDate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Notes:
          <textarea name="notes" value={tripData.notes} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">{editMode ? 'Update Trip' : 'Plan Trip'}</button>
        <button type="button" onClick={handleSuggestItinerary}>Suggest Itinerary</button>
      </form>

      {/* Itinerary */}
      <div className="itinerary-container">
        <h2>Itinerary</h2>
        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        <button onClick={handleAddItem}>Add Item</button>
        <ul>
          {itineraryItems.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display existing trips */}
      <div className="existing-trips-container">
        <h2>Existing Trips</h2>
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <div>
                <strong>Destination:</strong> {trip.destination}<br />
                <strong>Dates:</strong> {trip.startDate} to {trip.endDate}<br />
                <strong>Notes:</strong> {trip.notes}
                <ul>
                  {trip.itinerary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <button onClick={() => handleEditTrip(trip)}>Edit</button>
              <button onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TripPlanner;
