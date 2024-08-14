// components/Header.js
"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function Header() {
  const router = useRouter();

  // Define menu items for the admin panel
  const adminMenu = [
    {
      id: 1,
      name: 'Users',
      icon: '/user-icon.png',
      link: '/admin/users', // Example link for Users page
    },
    {
      id: 2,
      name: 'Drivers',
      icon: '/driver-icon.png',
      link: '/admin/drivers', // Example link for Drivers page
    },
    {
      id: 3,
      name: 'Rides',
      icon: '/ride-icon.png',
      link: '/admin/rides', // Example link for Rides page
    },
    {
      id: 4,
      name: 'Logout',
      icon: '/logout-icon.png',
      link: '/logout', // Example link for logout functionality
    },
  ];

  return (
    <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between bg-white shadow-md'>
      {/* Logo and Branding */}
      <div className='flex gap-24 items-center'>
        <Image
          src='/logo.png'
          width={70}
          height={70}
          alt='Logo'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        {/* Admin Menu Items */}
        <div className='flex gap-6 items-center'>
          {adminMenu.map((item) => (
            <div key={item.id} className='flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md transition duration-200'>
              <Image src={item.icon} width={17} height={17} />
              <Link href={item.link} className='text-[14px] font-medium text-gray-700 hover:text-gray-900'>
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* User Authentication Button */}
      <UserButton />
    </div>
  );
}

export default Header;
