"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext,useState } from 'react'
import { DriverInfoContext } from './../../context/DriverInfoContext';
import Link from 'next/link'
import axios from 'axios';
import './../../styles/Feedback.css'
import Swal from 'sweetalert2';
import RatingReview from './../../components/RatingReview'; 

function PaymentConfirmation() {
  const driverInfoContext = useContext(DriverInfoContext);
  const router = useRouter();
  const driverInfo = useContext(DriverInfoContext);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, feedback, rating: rating }),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error submitting feedback: ${response.status}`);
      }
  
      const data = await response.json(); 
      console.log(data);
      setEmail('');
      setFeedback('');
      setRating(0);
      Swal.fire("Your Feedback Successfully Submitted!");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(error.message);
    }
  };
  // const handleGoHome = async () => {
  
  //   const selectedCabModel = driverInfo.driverInfo.selectedCabModel; // Assuming you have a selectedCabModel property in the driverInfoContext
  
  //   if (!selectedCabModel) {
  //     console.error("No cab model selected");
  //     return;
  //   }
  
  //   const driverRoleData = {
  //     driverName: driverInfo.driverName,
  //     carRegistrationNumber: driverInfo.carRegistrationNumber,
  //     cabModel: selectedCabModel,
  //     // Add other relevant fields as needed
  //   };
  
  //   try {
  //     const response = await fetch('/create-driverrole-entry', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(driverRoleData),
  //     });
  
  //     if (response.ok) {
  //       console.log('Driver role entry created successfully!');
  //       router.push('/');
  //     } else {
  //       console.error('Error creating driver role entry:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error creating driver role entry:', error);
  //   }
  // };



  const handleDetails = () => {
    driverInfoContext.setDriverInfo({
      driverName: 'John Doe',
      carRegistrationNumber: 'ABC123',
    });
    router.push('/driverDetails'); // Navigate to the driver details page
  };
  const handleStartRide = () => {
    // Logic to start the ride, such as updating the ride status in the backend
    console.log('Ride started');
  };

  return (
    <div className='bg-[#f1f1f1] flex h-screen items-center justify-center flex-col'>
    <h2 className='text-[30px] z-20 mt-[-30px]'>Payment Confirmed</h2>
    <Image src='/uberconfirm.gif' width={500} height={150} className='object-cover mt-[-60px]' />
    <h2 className='font-bold text-[23px] mt-[-20px] mb-10'>Uber is Booked Successfully</h2>
    <div className='flex space-x-4'>
    <button className='p-2 bg-black text-white px-10 rounded-lg' onClick={handleStartRide}>
          Start Ride
        </button>
      <button className='p-2 bg-black text-white px-10 rounded-lg' onClick={handleOpenModal}>
        Give the Feedback
      </button>
      <Link className='p-2 bg-gray-700 text-white px-10 rounded-lg' href='/DriverDetails'>
        Go to Your Driver Details
      </Link>
    </div>

    {/* Modal window */}
    {isOpen && (
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div
            className='fixed inset-0 transition-opacity'
            aria-hidden='true'
          >
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <div
            className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    Give Feedback
                  </h3> 
                  <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <br />
      <label>Feedback:</label>
      <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} />
      <br />
      <label>Rating:</label>
      <RatingReview rating={rating} setRating={setRating} />
      <br />
      <button type="submit">Submit</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default PaymentConfirmation;
