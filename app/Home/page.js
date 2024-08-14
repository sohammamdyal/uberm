"use client"
import React, { useState } from 'react';
import styles from './../styles/Dsign.module.css';
import axios from 'axios';
import Link from 'next/link';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password
      });
      if (response.data.token) {
        // Redirect to dashboard or whatever
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1 className={styles.head}>Uber</h1>
      </header>
      <main className={styles.AppMain}>
        <h2 style={{marginBottom: 20}}>Create an account</h2>
        <input type="text" className={styles.input} placeholder="Enter email"
         value={email} 
         onChange={(e) => setEmail(e.target.value)}  />
         <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button className={styles.button} ><Link href='/DriverRole'>Sign up</Link></button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
    </div>
  );
};

export default SignUp;
