import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import styles from './../app/styles/Ride.module.css';
import './../styles/Ride.css';
import Message from './message' // Import NotificationBox component

// Simple Modal component
const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message, date, time });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <button className="absolute top-2 right-2" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold mb-4">Schedule Push Notification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message:</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Schedule</button>
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};



function AdminDashboard() {
  const [carRequests, setCarRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchCarRequests();
  }, []);

  const fetchCarRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/carRequests');
      setCarRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car requests:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading car requests...</p>;
  if (error) return <p>Error loading car requests: {error.message}</p>;

  const handleAccept = (id) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/requestCab/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      setCarRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'rejected' } : request
        )
      );

      toast.info('The ride request has been rejected.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject ride request. Please try again later.');
    }
  };

  const handleNotificationSubmit = async ({ message, date, time }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/notifications', {
      carRequestId: selectedRequestId,
      message,
      date,
      time,
    });

    console.log('Notification response:', response.data);

    setCarRequests(prevRequests =>
      prevRequests.map(request =>
        request._id === selectedRequestId ? { ...request, status: 'accepted' } : request
      )
    );

    toast.success('Notification scheduled and ride accepted!', {
      position: 'top-right',
    });
    Swal.fire('Notification scheduled!', '', 'success');
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error scheduling notification:', error.response ? error.response.data : error.message);
    toast.error('Failed to schedule notification. Please try again later.');
  }
};
  return (
    <div className="container">
      <h1 className="head">Ride Request</h1>
      <div className="search">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Model</th>
            <th>Pickup Location</th>
            <th>Destination Location</th>
            <th>Driver Name</th>
            <th>Plate Number</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {carRequests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>₹{request.amount}</td>
              <td>
                <img
                  src={request.carImage}
                  alt={request.carModel}
                  width="50"
                  height="50"
                />
              </td>
              <td>{request.pickupLocation}</td>
              <td>{request.destinationLocation}</td>
              <td>{request.driverName}</td>
              <td>{request.plateNumber}</td>
              <td>
                <button className="button" onClick={() => handleAccept(request.id)}>
                  Accept
                </button>
                <button className="button" onClick={() => handleReject(request.id)}>
                  Reject
                </button>
              </td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleNotificationSubmit} />
      <Message notifications={notifications} /> {/* Include NotificationBox component */}
    </div>
  );
}

export default AdminDashboard;
