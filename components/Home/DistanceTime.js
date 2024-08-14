import React from 'react';

function DistanceTime({ distance, duration }) {
  return (
    <div className='bg-black p-3'>
      <h2 className='text-white opacity-80 text-[15px]'>
        Distance: <span className='font-bold mr-3 text-white'>{distance} Miles</span>
        Duration: <span className='font-bold mr-3 text-white'>{duration} Min</span>
      </h2>

      
    </div>
    

    
  );
}

export default DistanceTime;