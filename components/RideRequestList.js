import React, { useState, useEffect } from 'react';
import RideRequest from './RideRequest';

const RideRequestList = () => {
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    fetch('/api/ride-requests')
      .then(response => response.json())
      .then(data => setRideRequests(data))
      .catch(error => console.error('Error fetching ride requests:', error));
  }, []);

  const handleRequestUpdate = (updatedRequest) => {
    setRideRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
  };

  return (
    <div>
      <h1>Ride Requests</h1>
      {rideRequests.map(request => (
        <RideRequest key={request.id} request={request} onRequestUpdate={handleRequestUpdate} />
      ))}
    </div>
  );
};

export default RideRequestList;
