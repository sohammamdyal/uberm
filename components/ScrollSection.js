import React, { useEffect, useState } from 'react';

const HorizontalScrollText = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll position as a percentage of the total scrollable area
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPosition(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '200vh' }}> {/* Extra height to enable scrolling */}
      <div
        style={{
          position: 'fixed', // Fix the container to the viewport
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh', // Cover the entire viewport height
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${scrollPosition}%`, // Move left based on scroll position
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            fontSize: '2rem',
            background: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '10px',
          }}
        >
          Your scrolling text goes here.
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollText;
