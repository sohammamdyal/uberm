"use client";
import React, { useState, useEffect } from "react";
import styles from "./../styles/Drole.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import './../../styles/Driver.css';
import './../../styles/TopD.css';
import AOS from 'aos';
import "aos/dist/aos.css";
import dri from './../../public/dri.jpg';
import MessageBox from './../../components/Messages';
import { MdNotificationsActive } from "react-icons/md";
import AnimCursor from './../../components/AnimCoursor';
const ManageRiders = () => {
  const [drivers, setDrivers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [driverName, setDriverName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [carRequests, setCarRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false); // State to toggle MessageBox visibility

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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
    setShowForm(true);
  };

  const handleReject = (id) => {
    // Handle reject logic here
  };

  const handleSchedule = () => {
    const notification = `Request ID: ${selectedRequestId}, Message: ${message}, Time: ${time}, Date: ${date}`;
    setNotifications([...notifications, notification]);
    setShowForm(false);
    setMessage('');
    setTime('');
    setDate('');
    Swal.fire("Successfully send request", "Navigate to notification", "success");
  };

  const toggleMessageBox = () => {
    setShowMessageBox(!showMessageBox);
  };

  return (
    <div>
      <AnimCursor/>
      <nav className="navbar">
        <div className="navbar-brand" data-aos="fade-right">Drive</div>
        <div>
          {driverName && driverEmail && (
            <div>
              <h2>Welcome, {driverName}</h2>
              <p>Email: {driverEmail}</p>
            </div>
          )}
        </div>
        <div className="navbar-links">
          <a href="#" onClick={toggleMessageBox} data-aos="fade-right"><MdNotificationsActive className="inline-block mr-3 text-xl" />Notifications</a>
        </div>
      </nav>
      <div className="container">
        <div className="content">
          <h1 data-aos="fade-right">The Uber driver app, your resource on the road</h1>
          <p data-aos="fade-right">
            The Uber driver app is easy to use and provides you with information to help you make decisions and get ahead.
            We collaborated with drivers and delivery people around the world to build it. See for yourself.
          </p>
          <div className="buttons" data-aos="fade-right">
            <button className="get-started">Get started</button>
            <a href="/signin" className="sign-in" data-aos="fade-right">Already have an account? Sign in</a>
          </div>
         
        </div>
        <div className="image" data-aos="fade-left">
          <Image src={dri} alt="Driver app illustration" className="img" />
        </div>
      </div>
      <div className="adminDashboard">
        <h1 style={{ fontSize: 35, marginBottom: 40 }} data-aos="fade-right">Driver Manage</h1>
        <table className="table" data-aos="fade-right">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Name</th>
              <th className="th">Amount</th>
              <th className="th">Model</th>
              <th className="th">Pickup Location</th>
              <th className="th">Destination Location</th>
              <th className="th">Driver Name</th>
              <th className="th">Plate Number</th>
              <th className="th">Actions</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {carRequests.map(request => (
              <tr key={request.id} className="tr">
                <td className="td">{request.id}</td>
                <td className="td">{request.name}</td>
                <td className="td">₹{request.amount}</td>
                <td className="td">
                  <img
                    src={request.carImage}
                    alt={request.carModel}
                    width="50"
                    height="50"
                    className="car-image"
                  />
                </td>
                <td className="td">{request.pickupLocation}</td>
                <td className="td">{request.destinationLocation}</td>
                <td className="td">{request.driverName}</td>
                <td className="td">{request.plateNumber}</td>
                <td className="td">
                  <button className="button accept" onClick={() => handleAccept(request.id)}>
                    Accept
                  </button>
                  <button className="button reject" onClick={() => handleReject(request.id)}>
                    Reject
                  </button>
                </td>
                <td className="td">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showForm && (
          <div className="form-container" data-aos="fade-right">
            <h2>Schedule Notification</h2>
            <div>
              <label>Message:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="button" onClick={handleSchedule}>Schedule</button>
          </div>
        )}
      </div>
      <div className={`sidebar ${showMessageBox ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMessageBox}>X</button>
        <MessageBox notifications={notifications} />
      </div>
      <style jsx>{`
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 16px;
          text-align: left;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .th, .td {
          padding: 12px 15px;
        }
        .th {
          background-color: #000;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
        }
        .tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .tr:hover {
          background-color: #f1f1f1;
        }
        .car-image {
          border-radius: 5px;
        }
        .button {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 5px;
        }
        .button.accept {
          background-color: #4CAF50;
          color: white;
        }
        .button.reject {
          background-color: #f44336;
          color: white;
        }
        .button.accept:hover, .button.reject:hover {
          opacity: 0.8;
        }
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: white;
          box-shadow: -2px 0 5px rgba(0,0,0,0.5);
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>

      
    </div>
    
  );
};

export default ManageRiders;
