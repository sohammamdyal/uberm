"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import UserPage from '../../components/User';
import DriverPage from '../../components/Driver';
import RidePage from '../../components/Ride';
import Dashboard from '../../components/Dashboard';
import ManualRideBookingForm from './../../components/ManualRideBookingForm';
import CarList  from '../../components/CarList';
import Document from './../../components/Document';
import ViewMap from './../../components/ViewMap';
import ContactUs from './../../components/ContactUs';
import FeedBack from './../../components/FeedBack';
import Profile from '../../components/Profile';

const AdminPanel = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
      });
  }, []);

  const renderContent = () => {
    switch (selectedPage) {
      case 'user':
        return <UserPage />;
      case 'driver':
        return <DriverPage />;
      case 'ride':
        return <RidePage />;
      case 'cardata':
        return <CarList />;
      case 'manual-ride-booking':
        return <ManualRideBookingForm />;
      case 'documents':
        return <Document />;
      case 'viewmap':
        return <ViewMap />;
      case 'contactus':
        return <ContactUs />;
      case 'managefeedback':
        return <FeedBack />;
      case 'profile':
        return <Profile userData={userData} />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-panel flex">
      <Sidebar setSelectedPage={setSelectedPage} />
      <div className="content p-5 flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
