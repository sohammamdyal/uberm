import React, { useRef, useEffect, useState } from 'react';
import './../styles/App.css';
import { Chart, registerables } from 'chart.js';
import user from './../public/profile.jpg'
import Image from 'next/image';
import logo from './../public/uber (2).svg'
import AOS from 'aos';
import "aos/dist/aos.css";
Chart.register(...registerables);
function App({ userData }) {
  const rideChartRef = useRef(null);
  const driverChartRef = useRef(null);
  const rideChart = useRef(null);
  const driverChart = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const rideChartCanvas = rideChartRef.current;
    const driverChartCanvas = driverChartRef.current;

    // Destroy existing charts
    if (rideChart.current) {
      rideChart.current.destroy();
    }
    if (driverChart.current) {
      driverChart.current.destroy();
    }

    // Create the ride chart
    rideChart.current = new Chart(rideChartCanvas, {
      type: 'line',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [{
          label: 'Ride Status',
          data: [1, 1, 10, 1, 10, 1, 1, 1, 1, 20, 40, 20],
          borderColor: '#ff0000',
          backgroundColor: '#ff0000',
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Create the driver chart
    driverChart.current = new Chart(driverChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Approved Drivers'],
        datasets: [{
          data: [246, 20],
          backgroundColor: ['#ff0000', '#f5f5f5'],
        }],
      },
      options: {
        cutout: '50%',
        legend: {
          display: false,
        },
      },
    });
  }, []);
  return (
    <div className="main-container">


      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="h-8 w-10" alt="Flowbite Logo" data-aos="fade-right" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" data-aos="fade-right">Uber Dashboard</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={dropdownVisible}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <Image className="w-8 h-8 rounded-full" src={user} alt="user avatar" data-aos="fade-left" />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded shadow-md dark:bg-gray-800">
                <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {userData ? (


                    <div className="profile-info">
                      <h1 className="profile-name">Name: {userData.name}</h1>
                      <p className="profile-email">Email: {userData.email}</p>
                    </div>
                  ) : (
                    <p className="loading-message">Loading...</p>
                  )}
                </div>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            {/* Other navbar items */}
          </div>
        </div>
      </nav>

      <div className="container">

        <div className="header">
          <div className="icon" data-aos="fade-right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.95 1.55C12.55 1.15 11.95 1 11.35 1H11C10.4 1 9.8 1.15 9.4 1.55L7 3.95L8.45 5.4L11.35 2.55C11.95 2 12.55 1.85 12.95 1.55ZM11 3L11 17H13L13 3H11ZM7 19C7 19.55 7.15 20.05 7.45 20.45L9.95 23L11.4 21.55C11.8 21.15 12 20.55 12 20C12 19.45 11.8 18.85 11.4 18.45L9.95 16.95L7.45 19.45C7.15 19.85 7 19.55 7 19ZM16 17H16.7L22 21.35L20.55 22.8C20.15 23.2 19.55 23.35 19.15 23.35L16 19.35V17ZM19.35 19.35L19.35 20.7L20.7 20.7L20.7 19.35L19.35 19.35ZM15 21V19.35L15.7 19.35L16.4 20.7L15.7 20.7L15.7 21L15 21ZM16 19.35L16 17.35L17.35 17.35L17.35 19.35L16 19.35ZM17.35 17.35L17.35 16L18.65 16L18.65 17.35L17.35 17.35Z" fill="#009884" />
            </svg>
          </div>
          <div className="title" style={{ color: "#000" }} data-aos="fade-right">
            Uber Cab
          </div>
          <div className="subtitle" data-aos="fade-right">
            Summary
          </div>
        </div>
        <div className="stats">
          <div className="stat" data-aos="fade-right">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Approved Drivers
            </div>
            <div className="stat-value">
              246
            </div>
          </div>
          <div className="stat" data-aos="fade-down">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Active Drivers
            </div>
            <div className="stat-value">
              155
            </div>
          </div>
          <div className="stat" data-aos="fade-down">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              UnApproved Drivers
            </div>
            <div className="stat-value">
              0
            </div>
          </div>
          <div className="stat" data-aos="fade-left">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Earnings
            </div>
            <div className="stat-value">
              21.36 K
            </div>
          </div>
        </div>
        <div className="subtitle" data-aos="fade-right">
          Last 7-Days Taxi Ride Statistics
        </div>
        <div className="stats" data-aos="fade-right">
          <div className="stat">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Total Rides
            </div>
            <div className="stat-value">
              26
            </div>
          </div>
          <div className="stat" data-aos="fade-up">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Completed Rides
            </div>
            <div className="stat-value">
              0
            </div>
          </div>
          <div className="stat" data-aos="fade-up">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Running Rides
            </div>
            <div className="stat-value">
              0
            </div>
          </div>
          <div className="stat" data-aos="fade-left">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="#009884" />
              </svg>
            </div>
            <div className="stat-title">
              Concelled Rides
            </div>
            <div className="stat-value">
              20
            </div>
          </div>
        </div>
        <div className="content">
          <div className="card" data-aos="fade-right">
            <div className="card-title">
              Ride Status
            </div>
            <div className="chart">
              <canvas ref={rideChartRef}></canvas>
            </div>
          </div>
          <div className="card" data-aos="fade-left">
            <div className="card-title">
              Driver Statistics
            </div>
            <div className="driver-stats">
              <div className="driver-stats-title">
                Total Drivers: 266
              </div>
              <div className="driver-stats-chart">
                <canvas ref={driverChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;