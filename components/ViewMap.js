import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Swal from 'sweetalert2';

const ViewMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearestCabs, setNearestCabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCab, setNewCab] = useState({ id: '', lat: '', lng: '', label: '' });
  const [activeTab, setActiveTab] = useState('all');

  const mapContainerStyle = {
    width: '100%',
    height: '590px',
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting current location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchNearestCabs = () => {
    return [
      { id: 1, lat: 17.7367, lng: 75.89835, label: 'Cab 1' },
      { id: 2, lat: 17.6287, lng: 75.9144, label: 'Cab 2' },
      { id: 3, lat: 17.6646, lng: 75.8934, label: 'Cab 3' },
      { id: 4, lat: 17.6599, lng: 75.9064, label: 'Cab 4' },
      { id: 5, lat: 17.6236, lng: 75.8959, label: 'Cab 5' },
    ];
  };

  const handleFindCabs = () => {
    const cabs = fetchNearestCabs();
    setNearestCabs(cabs);
  };

  const handleAddCab = (e) => {
    e.preventDefault();
    const newCabData = {
      id: parseInt(newCab.id),
      lat: parseFloat(newCab.lat),
      lng: parseFloat(newCab.lng),
      label: newCab.label,
    };
    Swal.fire("Cab Add Successfully");
    setNearestCabs((prevCabs) => [...prevCabs, newCabData]);
    setShowForm(false);
    setNewCab({ id: '', lat: '', lng: '', label: '' });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Drivers</h2>
        <div className="flex">
  <div className="flex-1">
    <button
      className={`px-4 py-2 ${activeTab === 'all' ? 'bg-gray-300' : ''}`}
      onClick={() => setActiveTab('all')}
    >
      All
    </button>
    <button
      className={`px-4 py-2 ${activeTab === 'available' ? 'bg-gray-300' : ''}`}
      onClick={() => setActiveTab('available')}
    >
      Available
    </button>
    <button
      className={`px-4 py-2 ${activeTab === 'rideStarted' ? 'bg-gray-300' : ''}`}
      onClick={() => setActiveTab('rideStarted')}
    >
      Ride Started
    </button>
    <button
      className={`px-4 py-2 ${activeTab === 'reachedPickup' ? 'bg-gray-300' : ''}`}
      onClick={() => setActiveTab('reachedPickup')}
    >
      Reached Pickup
    </button>
    <button
      className={`px-4 py-2 ${activeTab === 'enrouteToPickup' ? 'bg-gray-300' : ''}`}
      onClick={() => setActiveTab('enrouteToPickup')}
    >
      Enroute to Pickup
    </button>
  </div>
  <div className="flex-1 ml-4">
    {nearestCabs.map((cab) => (
      <div key={cab.id} className="p-2 bg-white shadow mb-2 rounded">
        {cab.label}
      </div>
    ))}
  </div>
</div>
      </div>
      
      {/* Main Content */}
      <div className="w-3/4 p-4">
        <div className="flex mb-4">
          <button
            className='p-2 bg-black mr-3 text-white rounded-lg hover:bg-white hover:text-black border hover:border-black transition ease-in-out duration-300'
            onClick={handleFindCabs}
          >
            Find Nearest Cabs
          </button>
          <button
            className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300'
            onClick={() => setShowForm(true)}
          >
            Add Cab
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddCab} className="mt-4 bg-gray-100 p-4 rounded shadow-md">
            <input
              type="number"
              placeholder="ID"
              value={newCab.id}
              onChange={(e) => setNewCab({ ...newCab, id: e.target.value })}
              required
              className="border rounded p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Latitude"
              value={newCab.lat}
              onChange={(e) => setNewCab({ ...newCab, lat: e.target.value })}
              required
              className="border rounded p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={newCab.lng}
              onChange={(e) => setNewCab({ ...newCab, lng: e.target.value })}
              required
              className="border rounded p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Label"
              value={newCab.label}
              onChange={(e) => setNewCab({ ...newCab, label: e.target.value })}
              required
              className="border rounded p-2 w-full mb-2"
            />
            <button type="submit" className="p-2 bg-green-500 text-white rounded ml-2">
              Submit
            </button>
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded ml-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}

        <LoadScript >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentLocation || { lat: 17.6649, lng: 75.9262 }}
            zoom={12}
           googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
          >
            {currentLocation && <Marker position={currentLocation} />}
            {nearestCabs.map((cab) => (
              <Marker
                key={cab.id}
                position={{ lat: cab.lat, lng: cab.lng }}
                label={cab.label}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};



export default ViewMap;