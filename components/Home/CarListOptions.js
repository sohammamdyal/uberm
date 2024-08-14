import { CarListData } from './../../utils/CarListData';
import React, { useState, useContext } from 'react';
import CarListItem from './CarListItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState({});
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const router = useRouter();

  const handleRequestCar = async () => {
    if (!source || !destination) {
      console.error('Source or Destination is not set.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/requestCab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: uuidv4(),
          name: selectedCar.name,
          amount: (selectedCar.amount * distance).toFixed(2),
          pickupLocation: source.name, // Use the 'name' field or any other string property
          destinationLocation: destination.name, // Use the 'name' field or any other string property
          driverName: selectedCar.driverInfo.name,
          plateNumber: selectedCar.driverInfo.plateNumber,
          image: selectedCar.driverInfo.image,
        }),
      });
  
      if (response.ok) {
        router.push('/payment?amount=' + (selectedCar.amount * distance).toFixed(2));
      } else {
        const errorData = await response.json();
        console.error('Failed to request car:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Error requesting car:', error);
    }
  };
  
  

  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md ${activeIndex === index ? 'border-2 border-black' : 'border border-transparent'}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border border-gray-300 items-center">
          <h2>Make Payment For</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300"
            onClick={handleRequestCar}
          >
            Request {selectedCar.name}
          </button>
          <Link
            href={{
              pathname: '/DriverDetails',
              query: {
                driverInfo: JSON.stringify(selectedCar.driverInfo),
              },
            }}
            legacyBehavior
          >
            <a className="ml-4 p-3 bg-black text-white rounded-lg text-center hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300">
              Driver Details
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;
