"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './../styles/Dsignup.module.css';
import Image from 'next/image';
import left from './../../public/driverre.png';
import AOS from 'aos';
import "aos/dist/aos.css";

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carmodel, setCarmodel] = useState('');
    const [phone, setPhone] = useState('');
    const [platenumber, setPlatenumber] = useState('');
    const [experience, setExperience] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:5000/api/driver-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    carmodel,
                    phone,
                    platenumber,
                    experience,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setCarmodel('');
                setPhone('');
                setPlatenumber('');
                setExperience('');
            }
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div>
            <div className={styles.signupForm}>
                <div className={styles.container}>
                    <div className={styles.leftPane} style={{ borderStartEndRadius: "10%", borderEndEndRadius: "10%" }}>
                        <div className={styles.textContainer}>
                            <Image src={left} data-aos="zoom-in-up" />
                        </div>
                    </div>
                    <div className={styles.rightPane}>
                        <h2 className={styles.h2} data-aos="fade-left">Driver Register</h2>
                        <p className={styles.p} data-aos="fade-left">Manage the Driver role</p>
                        <form onSubmit={handleSubmit} className={styles.form} data-aos="fade-left">
                            <div className={styles.gridContainer}>
                                <div className={styles.gridItem}>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className={styles.input}
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
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
                                <div className={styles.gridItem}>
                                    <label>Car Model:</label>
                                    <input
                                        type="text"
                                        placeholder="Car Model"
                                        className={styles.input}
                                        value={carmodel}
                                        onChange={(event) => setCarmodel(event.target.value)}
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className={styles.input}
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <label>Number Plate:</label>
                                    <input
                                        type="text"
                                        placeholder="Number Plate"
                                        className={styles.input}
                                        value={platenumber}
                                        onChange={(event) => setPlatenumber(event.target.value)}
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <label>Experience:</label>
                                    <input
                                        type="text"
                                        placeholder="Experience"
                                        className={styles.input}
                                        value={experience}
                                        onChange={(event) => setExperience(event.target.value)}
                                    />
                                </div>
                            </div>
                            {error && <div className={styles.error}>{error}</div>}
                            {success && <div className={styles.success}>Sign up successful! You can now log in.</div>}
                            {/* <button className={styles.button} type="submit">Create Account</button> */}
                            <button class="relative w-full flex h-[50px] items-center justify-center overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-black hover:before:h-56 hover:before:w-full hover:text-white">
      <span class="relative z-10">Create Account</span>
    </button>
    <Link href='/signin' legacyBehavior><a className={styles.a} data-aos="fade-left">Already have an account? Log in</a></Link>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
