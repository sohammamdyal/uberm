"use client"
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import MessageBox from './../../components/Messages';

const Notifications = () => {
  // const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

  // const socket = io();

  // socket.on('rideRequestAccepted', (id) => {
  //   setNotifications((prevNotifications) => [...prevNotifications, `Your ride request with ID ${id} has been accepted!`]);
  // });

  // const handleTabClick = () => {
  //   setShowNotifications(true);
  // };

  // const handleClose = () => {
  //   setShowNotifications(false);
  // };
  // const handleSchedule = () => {
  //   const notification = `Request ID: ${selectedRequestId}, Message: ${message}, Time: ${time}, Date: ${date}`;
  //   setNotifications([...notifications, notification]);
  //   setShowForm(false);
  //   setMessage('');
  //   setTime('');
  //   setDate('');
  // };

  return (
    
       <MessageBox notifications={notifications} />
    
  );
};

export default Notifications;