import React, { useState, useEffect } from 'react';
import styles from './../app/styles/AdminDashboard.module.css';
import MessageBox from './Header';
import './../styles/User.css'
const ManualUserAdd = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError('An error occurred while fetching data. Please try again.');
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setEmail('');
        setPassword('');
        setMessage('User added successfully!');
        setShowMessageBox(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred while adding user. Please try again.');
      console.log(error);
    }
  };

  useEffect(() => {
    if (showMessageBox) {
      setTimeout(() => {
        setShowMessageBox(false);
      }, 3000); // Close the message box after 3 seconds
    }
  }, [showMessageBox]);

  return (
    <div className={styles.adminDashboard}>
      <h1 style={{
        marginTop: 0,
        fontWeight: "bold",
        fontSize: 35,
        marginBottom: 15,
        color: "#333",
      }}>Manual User Add</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-10 max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className={styles.tr}>
                <td className={styles.td}>{user._id}</td>
                <td className={styles.td}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showMessageBox && <MessageBox message={message} setShowMessageBox={setShowMessageBox} />}
    </div>
  );
};

export default ManualUserAdd;