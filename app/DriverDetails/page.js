"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const DriverDetails = () => {
  const searchParams = useSearchParams();
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {
  const driverInfoParam = searchParams.get('driverInfo');
  console.log('driverInfoParam:', driverInfoParam);
  if (driverInfoParam) {
    try {
      const parsedDriverInfo = JSON.parse(driverInfoParam);
      setDriverInfo({
        ...parsedDriverInfo,
        sourceLocation: parsedDriverInfo.source,
        destinationLocation: parsedDriverInfo.destination,
      });
    } catch (error) {
      console.error('Failed to parse driverInfo:', error);
    }
  }
}, [searchParams]);

  if (!driverInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-5'>
      <h1 className='text-[22px] font-bold'>Driver Details</h1>
      <div className='mt-4 flex flex-col items-center' style={{border:1, borderRadius:10}}>
       
        <p><strong>Name:</strong> {driverInfo.name}</p>
        <p><strong>Rating:</strong> {driverInfo.rating}</p>
        <p><strong>SourceLocation:</strong> {driverInfo.sourceLocation ? driverInfo.sourceLocation : 'Not available'}</p>
<p><strong>DestinationLocation:</strong> {driverInfo.destinationLocation ? driverInfo.destinationLocation : 'Not available'}</p>
        <p><strong>Phone:</strong> {driverInfo.phone}</p>
        <p><strong>Make:</strong> {driverInfo.make}</p>
        <p><strong>Model:</strong> {driverInfo.model}</p>
        <p><strong>Year:</strong> {driverInfo.year}</p>
        <p><strong>Number Plate:</strong> {driverInfo.plateNumber}</p>
        
        <p><strong>Additional Details:</strong> {driverInfo.additionalDetails}</p>
        {/* Add more driver details as needed */}
      </div>
      {driverInfo.image && (
          <div className='w-32 h-32 rounded-full overflow-hidden'>
            <Image
              src={driverInfo.image}
              alt={`Image of ${driverInfo.name}`}
              width={100}
              height={100}
             
            />
          </div>
        )}
    </div>
  );
};

export default DriverDetails;
