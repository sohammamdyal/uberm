// Profile.js
import React from 'react';
import Image from 'next/image';
import "./../styles/Profile.css"
import adminImage from './../public/profile.jpg'
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

const Profile = ({ userData, logout }) => {
  const [editing, setEditing] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-content">
          <Image src={adminImage} alt="Admin Profile Image" className="profile-image" />
          <div className="profile-info">
            <h1 className="profile-name">Name: {userData.name}</h1>
            <p className="profile-email">Email: {userData.email}</p>
          </div>
          <div className="profile-actions">
          
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default Profile;