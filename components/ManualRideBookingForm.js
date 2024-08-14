import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './../styles/Manual.css'
const ManualRideBookingForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [rideBookings, setRideBookings] = useState([]); // new state to hold table data

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBooking = {
      pickupLocation,
      destinationLocation,
      customerName,
      customerPhone,
      dateTime,
    };
    setRideBookings([...rideBookings, newBooking]); // add new booking to table data
    console.log('Form submitted:', newBooking);
    Swal.fire("Booking Confirmed", "Your Ride added in list", "success");
    // Reset form fields after submission if needed
    setPickupLocation('');
    setDestinationLocation('');
    setCustomerName('');
    setCustomerPhone('');
    setDateTime('');
  };

  return (
    <div className="container">
      <h2>Manual Ride Booking</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Pickup Location:
          <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="input" />
        </label>
        <label>
          Destination Location:
          <input type="text" value={destinationLocation} onChange={(e) => setDestinationLocation(e.target.value)} className="input" />
        </label>
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input" />
        </label>
        <label>
          Customer Phone:
          <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="input" />
        </label>
        <label>
          Date & Time:
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="input" />
        </label>
        <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Book Ride</button>
      </form>

      <h2>Ride Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Pickup Location</th>
            <th>Destination Location</th>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {rideBookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.pickupLocation}</td>
              <td>{booking.destinationLocation}</td>
              <td>{booking.customerName}</td>
              <td>{booking.customerPhone}</td>
              <td>{booking.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManualRideBookingForm;