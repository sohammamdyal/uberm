import React, { useState } from 'react';
import Modal from 'react-modal'; // You can use any modal library
import axios from 'axios';

Modal.setAppElement('#root'); // Replace '#root' with your app's root element ID

function ScheduleNotificationModal({ isOpen, onClose, onSubmit }) {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message, date, time });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Schedule Notification">
      <h2>Schedule Push Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit">Schedule</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
}

export default ScheduleNotificationModal;
