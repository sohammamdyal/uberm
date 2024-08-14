"use client"
import React, { useState,useEffect } from 'react';
import styles from './../styles/Dsignup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import signip from './../../public/signup.png'
import AOS from 'aos';
import "aos/dist/aos.css";
const AdminSignup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
		AOS.init({ duration: 2000 });
	}, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        console.log(name,email,password);
        fetch("http://localhost:5000/register", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                name,
                email,
                password
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
            if(data.status=="ok"){
                alert("Register Successful");
                
              }
        })
      };
      


    return (
        <div className={styles.signupForm}>
        <div className={styles.container}>
                    <div className={styles.leftPane} style={{backgroundColor:"#673147", borderStartEndRadius:"10%", borderEndEndRadius:"10%"}}>
                        <div className={styles.textContainer}>
                            <Image src={signip} data-aos="zoom-in-up" />
                        </div>

                    </div>
                    <div className={styles.rightPane}>
                        <h2 className={styles.h2} data-aos="fade-left">Admin Register</h2>
                        <p className={styles.p} data-aos="fade-left">Manage the Admin role</p>
                        <form onSubmit={handleSubmit} className={styles.form} data-aos="fade-left">
                            <div className={styles.gridContainer}>
                            <div className={styles.gridItem}>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
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
                          
                            </div>
                            {error && <div className={styles.error}>{error}</div>}
                            {success && <div className={styles.success}>Sign up successful! You can now log in.</div>}
                            {/* <button className={styles.button} type="submit">Create Account</button> */}
                            <button class="relative w-full flex h-[50px] items-center justify-center overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-black hover:before:h-56 hover:before:w-full hover:text-white">
      <span class="relative z-10">Create Account</span>
    </button>
                        </form>
                        <Link href='/AdminSignin' legacyBehavior><a className={styles.a} data-aos="fade-left">Already have a account? Log In</a></Link>
                    </div>
                </div>
      </div>
      );
}

export default AdminSignup;