"use client"
import { Elements, useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { DriverInfoContext } from './../../context/DriverInfoContext';
import { loadStripe } from '@stripe/stripe-js';
const notify = () => {
  toast('Booking Confirmed.');
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function CheckoutForm({ amount }) { 

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const driverInfo  = useContext(DriverInfoContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(elements==null){
      return ;
    }
    const {error:submitError}=await elements.submit();
    if(submitError){
      return ;
    }
    const res = await fetch('/api/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount
      }),
    });

    const secretKey = await res.json();
    console.log(secretKey);

    const {paymentIntents, error } = await stripe.confirmPayment({
    clientSecret:secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm"
      } 
      
    });

    if (!error) {
      notify();
      await createDriverRoleEntry(driverInfo);
      router.push('/driverrole');
    }
  };

  const createDriverRoleEntry = async (driverInfo) => {
    try {
      const response = await fetch('/api/create-driverrole-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverInfo),
      });

      if (!response.ok) {
        console.error('Error creating driver role entry:', response.status);
      }
    } catch (error) {
      console.error('Error creating driver role entry:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-6'>
      <h2 className='m-5 font-bold'>Amount to Pay: {amount}</h2>
      <form onSubmit={handleSubmit} className='max-w-md'>
        <PaymentElement />
        <ToastContainer />
        <button onClick={notify} className='w-full bg-black text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300'>
          Pay
        </button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutForm;
