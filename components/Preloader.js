import React, { useEffect } from 'react'
import "./../styles/Preloader.css";
import {preLoaderAnim} from './../app/animation';
function Preloader() {
    useEffect(()=>{
        preLoaderAnim()
    },[]);
  return (
    <div className='preloader'>
        <div className='texts-container'>
            <span>About</span>
            <span>Us</span>
        </div>
        
        </div>
  )
}

export default Preloader