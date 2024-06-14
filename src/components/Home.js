import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Trip Planner</h1>
      <p>Plan and organize your travel itineraries effortlessly!</p>

      <div className="features-container">
        <div className="feature">
          <i className="fas fa-map-marker-alt fa-3x"></i>
          <h3>Choose Destinations</h3>
          <p>Select your dream destinations with ease.</p>
        </div>
        <div className="feature">
          <i className="fas fa-calendar-alt fa-3x"></i>
          <h3>Set Dates</h3>
          <p>Specify your travel dates for accurate planning.</p>
        </div>
        <div className="feature">
          <i className="fas fa-list-ul fa-3x"></i>
          <h3>Create Itineraries</h3>
          <p>Build detailed itineraries for each trip you plan.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
