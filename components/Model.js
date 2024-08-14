import React, { useState } from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onClose, onSchedule }) => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({ message, time, date });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Schedule Form"
      ariaHideApp={false}
    >
      <h2>Schedule Ride</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Schedule</button>
      </form>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default CustomModal;
