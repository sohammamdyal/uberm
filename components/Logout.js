import React from 'react';
import { useAuth } from '@clerk/nextjs';

const Logout = () => {
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
    <button onClick={handleLogout} className="block py-2.5 px-4 rounded transition duration-200 text-red-500 hover:bg-red-100">
      Logout
    </button>
  );
};

export default Logout;
