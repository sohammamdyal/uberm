"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './../styles/Dsignup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logi from './../../public/driverlo.png';
import Swal from 'sweetalert2';
import AOS from 'aos';
import "aos/dist/aos.css";

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setDriverName(data.name); // Assuming the server returns the driver's name
        setDriverEmail(data.email); // Assuming the server returns the driver's email
        Swal.fire("Driver Login Successfully", "You Can Log In", "success");
        window.localStorage.setItem("token", data.token); // Store token
        window.localStorage.setItem("driverName", data.name); // Store driver's name
        window.localStorage.setItem("driverEmail", data.email); // Store driver's email
        router.push('/DriverRole'); // Use useRouter for redirection
      } else {
        setError(data.error || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className={styles.signupForm} style={{ width: "90%" }}>
      <div className={styles.container} style={{ height: "70vh" }}>
        <div className={styles.leftPane} style={{ backgroundColor: "#DC143C", width: "40%", borderStartEndRadius: "10%", borderEndEndRadius: "10%" }}>
          <div className={styles.textContainer}>
            <Image src={logi} data-aos="zoom-in-up" />
          </div>
        </div>
        <div className={styles.rightPane}>
          <h2 className={styles.h2} data-aos="fade-left">Driver Log In</h2>
          <p className={styles.p} data-aos="fade-left">Manage the Driver role</p>
          <form onSubmit={handleSubmit} className={styles.form} data-aos="fade-left">
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <label>Email ID:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className={styles.gridItem}>
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>Sign in successful! You can now log in.</div>}
            {/* <button className={styles.button} type="submit">Log In</button> */}
            <button class="relative w-full flex h-[50px] items-center justify-center overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-black hover:before:h-56 hover:before:w-full hover:text-white">
      <span class="relative z-10">Register</span>
    </button>
          </form>
          <Link href='/signup' legacyBehavior><a className={styles.a} data-aos="fade-left">Don't Have account? Register</a></Link>
        
   
        </div>
      </div>
      
    </div>
  );
};

export default SigninPage;
