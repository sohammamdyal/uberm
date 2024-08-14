import React, { useContext, useEffect, useState, useRef } from 'react';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import DistanceTime from './DistanceTime';
import AOS from 'aos';
import "aos/dist/aos.css";
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const convertMetersToMiles = (meters) => {
  const miles = meters * 0.000621371192;
  return miles.toFixed(2);
};

const convertSecondsToMinutes = (seconds) => {
  const minutes = seconds / 60;
  return minutes.toFixed(2);
};

function GoogleMapSection() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const sourceMarker = useRef(null);
  const destinationMarker = useRef(null);
  const directions = useRef(null);
  const cabMarkers = useRef({});
  const geolocateControl = useRef(null);
  const userLocationMarker = useRef(null);

  const { source, setSource } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [eta, setEta] = useState('');
  const [cabs, setCabs] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const isValidCoordinate = (coord) => coord && !isNaN(coord.lat) && !isNaN(coord.lng);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [75.9262, 17.6649],
      zoom: 8,
    });

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    map.current.addControl(directions.current, 'top-left');

    new mapboxgl.Marker().setLngLat([75.9262, 17.6649]).addTo(map.current);

    directions.current.on('route', (e) => {
      const route = e.route[0];
      setDistance(convertMetersToMiles(route.distance));
      setDuration(convertSecondsToMinutes(route.duration));
      setEta(calculateETA(route.duration));
    });
  }, []);

  const calculateETA = (durationInSeconds) => {
    const now = new Date();
    const eta = new Date(now.getTime() + durationInSeconds * 1000);
    return eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const updateCabMarkers = () => {
    if (!map.current || !cabs.length) return;

    cabs.forEach(cab => {
      if (cabMarkers.current[cab.id]) {
        cabMarkers.current[cab.id].setLngLat([cab.lng, cab.lat]);
      } else {
        const marker = new mapboxgl.Marker({ color: 'green' })
          .setLngLat([cab.lng, cab.lat])
          .addTo(map.current);
        cabMarkers.current[cab.id] = marker;
      }
    });
  };

  useEffect(() => {
    if (isValidCoordinate(source)) {
      if (sourceMarker.current) {
        sourceMarker.current.setLngLat([source.lng, source.lat]);
      } else {
        sourceMarker.current = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([source.lng, source.lat])
          .addTo(map.current);
      }
    }

    if (isValidCoordinate(destination)) {
      if (destinationMarker.current) {
        destinationMarker.current.setLngLat([destination.lng, destination.lat]);
      } else {
        destinationMarker.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([destination.lng, destination.lat])
          .addTo(map.current);
      }
    }

    if (isValidCoordinate(source) && isValidCoordinate(destination)) {
      directions.current.setOrigin([source.lng, source.lat]);
      directions.current.setDestination([destination.lng, destination.lat]);
      fitMapToBounds();
    }
  }, [source, destination]);

  const fitMapToBounds = () => {
    if (map.current && isValidCoordinate(source) && isValidCoordinate(destination)) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([source.lng, source.lat]);
      bounds.extend([destination.lng, destination.lat]);
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  const fetchCabsData = () => {
    // Simulate fetching data or replace this with actual API call
    const newCabs = [
      { id: 'cab1', lat: 17.654, lng: 75.924 },
      { id: 'cab2', lat: 17.657, lng: 75.925 },
      // Add more cabs as needed
    ];
    setCabs(newCabs);
  };

  useEffect(() => {
    fetchCabsData();
    const interval = setInterval(fetchCabsData, 5000); // Update cabs data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateCabMarkers();
  }, [cabs]);

  const handleSearch = () => {
    // Logic to find cabs nearest to source or destination
  };

  const handleStartNavigation = () => {
    if (!geolocateControl.current) {
      geolocateControl.current = new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
        showUserHeading: true,
      });

      map.current.addControl(geolocateControl.current, 'top-right');

      geolocateControl.current.on('geolocate', (e) => {
        const { coords } = e;
        const { latitude, longitude } = coords;

        if (userLocationMarker.current) {
          userLocationMarker.current.setLngLat([longitude, latitude]);
        } else {
          userLocationMarker.current = new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }

        // Optional: Center the map on the user's location
        map.current.setCenter([longitude, latitude]);
      });
    }

    geolocateControl.current.trigger();
    setIsNavigating(true);
  };

  return (
    <div>
      <button data-aos="fade-left"
        className='p-2 bg-black w-50 text-white rounded-lg hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300'
        onClick={handleSearch}
      >
        Find Cabs Nearest
      </button>
      <button data-aos="fade-left"
        className='p-2 bg-black w-50 text-white rounded-lg hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300'
        onClick={handleStartNavigation}
      >
        Start Navigation
      </button>
      <div ref={mapContainer} style={{ width: '65vw', height: '78vh' }} />
      <div className='absolute bottom-[90px] z-20 right-[20px] hidden md:block'>
        <DistanceTime distance={distance} duration={duration} />
      </div>
      <div className='absolute bottom-[60px] z-20 right-[20px] hidden md:block'>
        <p className='bg-white p-2 rounded-lg shadow-md'>
          ETA: {eta}
        </p>
      </div>
    </div>
  );
}

export default GoogleMapSection;
