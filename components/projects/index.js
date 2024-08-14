'use client';
import { useState } from 'react';
import styles from './style.module.css';
import Titles from './titles';
import Descriptions from './descriptions';

const data = [
    {
        title: "Ride",
        description: "We’ve partnered with healthcare organizations to provide their members and patients.",
        speed: 0.5
    },
    {
        title: "Earning",
        description: "Make the most of your time on the road on the platform with the largest network of active riders.",
        speed: 0.5
    },
    {
        title: "MC",
        description: "Helping to improve public transportation and access to care for those in need.",
        speed: 0.67
    },
    {
        title: "Helping.B",
        description: "See how Uber Freight and Uber for Business help organizations across the world.",
        speed: 0.8
    },
    {
        title: "Delivery",
        description: "An easy delivery solution that allows people to send items the same day.",
        speed: 0.8
    },
    {
        title: "Rides",
        description: "There’s more than one way to move with Uber, no matter where you are or where you’re headed next.",
        speed: 0.8
    }
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    return (
        <div className={styles.container}>
            <Titles data={data} setSelectedProject={setSelectedProject}/>
            <Descriptions data={data} selectedProject={selectedProject}/>
        </div>
    )
}