import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationBox = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications: {error.message}</p>;

  return (
    <div className="notification-box">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <p>{new Date(notification.date).toLocaleDateString()} {notification.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBox;
