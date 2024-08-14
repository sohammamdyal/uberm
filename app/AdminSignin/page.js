"use client"
import React, { useState, useEffect } from 'react';
import styles from './../styles/Dsignup.module.css';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Image from 'next/image';
import signm from './../../public/signin.png'
import AOS from 'aos';
import "aos/dist/aos.css";
const AdminSignin = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 2000 });
}, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
   console.log(email,password);
   fetch("http://localhost:5000/login-user", {
    method:"POST",
    crossDomain:true,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
    },
    body:JSON.stringify({
        email,
        password
    }),
}).then((res)=>res.json())
.then((data)=>{
    console.log(data,"userRegister");
    if(data.status=="ok"){
      alert("login successfull");
      Swal.fire("Admin Login Successfully");
      window.localStorage.setItem("token",data.data);
      window.location.href="./AdminMain";
    }
})

  };

    return (
        <>
        <div className={styles.signupForm} style={{width:"90%"}}>
        <div className={styles.container} style={{height:"70vh"}}>
                    <div className={styles.leftPane}  style={{backgroundColor:"#072C07", width:"40%",borderStartEndRadius:"10%", borderEndEndRadius:"10%"}}>
                        <div className={styles.textContainer}>
                            <Image src={signm} data-aos="zoom-in-up" />
                        </div>

                    </div>
                    <div className={styles.rightPane} style={{width:"60%"}} >
                        <h2 className={styles.h2} data-aos="fade-left">Admin Log In</h2>
                        <p className={styles.p} data-aos="fade-left">Manage the Admin role</p>
                   
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
                            {success && <div className={styles.success}>Sign up successful! You can now log in.</div>}
                            {/* <button className={styles.button} type="submit">Log In</button> */}
                            <button class="relative w-full flex h-[50px] items-center justify-center overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-black hover:before:h-56 hover:before:w-full hover:text-white">
      <span class="relative z-10">Sign In</span>
    </button>
                        </form>
                        <Link href='/AdminSignup' legacyBehavior><a className={styles.a} data-aos="fade-left">Don't Have account? Register</a></Link>
                    </div>
                </div>
        </div>
        </>
      );

     
};


export default AdminSignin;