import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';


const DriverDetail = () => {
  const router = useRouter();
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {
    if (router.query.driverInfo) {
      setDriverInfo(JSON.parse(router.query.driverInfo));
    }
  }, [router.query.driverInfo]);

  if (!driverInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-5'>
      <h1 className='text-[22px] font-bold'>Driver Details</h1>
      <div className='mt-4'>
     
        <p><strong>Name:</strong> {driverInfo.name}</p>
        <p><strong>Rating:</strong> {driverInfo.rating}</p>
        <p><strong>Phone:</strong> {driverInfo.phone}</p>
        {/* Add more driver details as needed */}
      </div>
    </div>
  );
};

export default DriverDetail;
