import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './../app/styles/Ride.module.css'
import './../styles/Driver.css'
const AdminDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);
  const [driverStatus, setDriverStatus] = useState({});
  const handleStatusChange = (driverId) => {
    setDriverStatus(prevState => ({
      ...prevState,
      [driverId]: !prevState[driverId], // Toggle the status
    }));
  };
  useEffect(() => {
    const fetchDrivers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/drivers');
            const data = await response.json();
            
            if (response.ok) {
                setDrivers(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch drivers. Please try again.');
        }
    };

    fetchDrivers();
}, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/drivers/${id}`)
    .then(response => {
        setDrivers(drivers.filter(driver => driver._id!== id));
      })
    .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="adminDashboard">
  <h1 style={{ fontSize: 35, marginBottom: 40, textAlign: 'center', color: '#333' }}>Driver Manage</h1>
  <div className="tableContainer">
    <table className="styledTable">
      <thead>
        <tr>
          <th className="th">Status</th>
          <th className="th">Name</th>
          <th className="th">Email</th>
          <th className="th">Car Model</th>
          <th className="th">Phone</th>
          <th className="th">Plate Number</th>
          <th className="th">Experience</th>
          <th className="th">Action</th>
          <th className="th">Status</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(driver => (
          <tr key={driver._id} className="tableRow">
            <td className="td">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!driverStatus[driver._id]}
                  onChange={() => handleStatusChange(driver._id)}
                />
                <span className="slider round"></span>
              </label>
            </td>
            <td className="td">{driver.name}</td>
            <td className="td">{driver.email}</td>
            <td className="td">{driver.carmodel}</td>
            <td className="td">{driver.phone}</td>
            <td className="td">{driver.platenumber}</td>
            <td className="td">{driver.experience}</td>
            <td className="td">
              <button className="actionButton" onClick={() => handleRemove(driver._id)}>Remove</button>
            </td>
            <td className="td">
              <span className={driverStatus[driver._id] ? 'statusOnline' : 'statusOffline'}>
                {driverStatus[driver._id] ? 'Online' : 'Offline'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AdminDashboard;