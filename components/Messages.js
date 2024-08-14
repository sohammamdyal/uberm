import React from 'react';
import './../styles/Messa.css';

const MessageBox = ({ notifications }) => {
  return (
    <div className="message-box">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
