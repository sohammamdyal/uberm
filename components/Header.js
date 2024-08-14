import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessagesBox from './Messages';
import { MdNotificationsActive } from "react-icons/md";
function Header({ message }) {
  const router = useRouter();
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const toggleMessageBox = () => {
    setIsMessageBoxOpen(!isMessageBoxOpen);
    setShowMessageBox(!showMessageBox);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

//  const handleSchedule = () => {
//     const notification = `Request ID: ${selectedRequestId}, Message: ${message}, Time: ${time}, Date: ${date}`;
//     setNotifications([...notifications, notification]);
//     setShowForm(false);
//     setMessage('');
//     setTime('');
//     setDate('');
//     Swal.fire("Successfully send request", "Navigate to notification", "success");
//   };

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        console.log('API Response:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    const handleMessage = async (message) => {
      try {
        const response = await axios.post('http://localhost:5000/api/messages', { message });
        console.log('Message sent:', response.data);
        setMessages([...messages, response.data]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    console.log('Messages state:', messages);
  return (
    <div className='p-2 pb-2 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
      <div className='flex gap-24 items-center'>
        <Image
          src='/logo.png'
          width={70} height={70}
          alt='Logo'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <div className='flex gap-6 items-center relative'>
          {/* <Link href='' className='text-[14px] font-medium'>Driver</Link>
          <Link href='' className='text-[14px] font-medium'>Package</Link> */}
          <div className='flex gap-10 pl-40 items-center'>
            <Link href='/DriverPage' className='text-[14px] font-medium group relative'><span>Driver</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </Link>
            <Link href='/About' className='text-[14px] font-medium group relative'><span>About Us</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </Link>
            <Link href='/OurOffer' className='text-[14px] font-medium group relative'><span>Our Offering</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </Link>
            <Link href='/Help' className='text-[14px] font-medium group relative'><span>Contact Us</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </Link>
            <Link href='/Notify' className='text-[14px] font-medium group relative'><span>Notify</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </Link>
            {/* <button onClick={() => setShowMessages(!showMessages)} className='text-[14px] font-medium group relative'><span>Message</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
            </button> */}
            {/* {showMessages && <Messages messages={messages} handleMessage={handleMessage} />} */}
            <div className="navbar-links rounded-full" style={{marginLeft:280, backgroundColor:"#EE4264", height:30,width:40}}>
              
          <a href="#" onClick={toggleMessageBox} data-aos="fade-right"><MdNotificationsActive className="inline-block ml-2 text-xl mt-1" style={{color:"#fff", alignItems:"center"}} /></a>
        </div>
          </div>
          <div className={`sidebar ${showMessageBox ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMessageBox}>X</button>
        <MessagesBox notifications={notifications} />
      </div>
      <style jsx>{`
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 16px;
          text-align: left;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .th, .td {
          padding: 12px 15px;
        }
        .th {
          background-color: #000;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
        }
        .tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .tr:hover {
          background-color: #f1f1f1;
        }
        .car-image {
          border-radius: 5px;
        }
        .button {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 5px;
        }
        .button.accept {
          background-color: #4CAF50;
          color: white;
        }
        .button.reject {
          background-color: #f44336;
          color: white;
        }
        .button.accept:hover, .button.reject:hover {
          opacity: 0.8;
        }
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: white;
          box-shadow: -2px 0 5px rgba(0,0,0,0.5);
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>

        </div>
      </div>
      <UserButton />

      {/* {isMessageBoxOpen && (
        <div className='fixed top-20 right-10 bg-white border border-gray-200 shadow-lg p-5 rounded-lg z-50'>
          <h3 className='text-lg font-medium mb-3'>Admin Messages</h3>
          <div className='max-h-60 overflow-y-auto'>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className='message-item'>
                  <p>{message.text}</p>
               
                </div>
              ))
            ) : (
              <div className='message-item'>No new messages</div>
            )}
          </div>
      
          <button onClick={toggleMessageBox} className='mt-3 bg-red-500 text-white py-1 px-3 rounded'>
            Close   
          </button>
          <input
            type='text'
           placeholder='Type your message here'
            className='w-full p-2 mt-3 border border-gray-300 rounded-lg'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      )} */}
    </div>
  );
}

export default Header;