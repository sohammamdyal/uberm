import React, { useState, useEffect } from 'react';
import styles from './../app/styles/Ride.module.css'
import Swal from 'sweetalert2';
function CarList() {


  useEffect(() => { 
    fetch('http://localhost:3000/cars')
      .then(response => response.json())
      .then(data => setCars(data));
  }, []);

  const [cars, setCars]= useState([
    {
        id: 1,
        name: 'Uber X',
        seat: 4,
        desc: 'Affordable, Everyday rides',
        amount: 1.1,
        image: '/UberX_v1.png',
        driverInfo: {
            image: 'https://www.pexels.com/photo/close-up-photo-of-glowing-blue-butterflies-326055/',
            name: 'Soham Mamdyal',
            rating: 4.5,
            phone: '123-456-7890',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC123',
            additionalDetails: 'Experienced driver with 5+ years of driving service.',
            sourceLocation: '', // Add this property to store source location
            destinationLocation: '',
          },
                   
    },
    {
        id: 2,
        name: 'Comfort',
        seat: 4,
        desc: 'Newer cars with extra legroom',
        amount: 1.6,
        image: '/UberComfort.png',
        driverInfo: {
            image: 'https://www.pexels.com/photo/close-up-photo-of-glowing-blue-butterflies-326055/',
            name: 'Soham Mamdyal',
            rating: 4.5,
            phone: '123-456-7890',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC123',
            additionalDetails: 'Experienced driver with 5+ years of driving service.',
            sourceLocation: '', // Add this property to store source location
            destinationLocation: '',
          },
    },
    {
        id: 3,
        name: 'UberXL',
        seat: 6,
        desc: 'Affordable rides for groups up to 6',
        amount: 1.9,
        image: '/UberXL_New.png',
        driverInfo: {
            image: 'https://www.pexels.com/photo/close-up-photo-of-glowing-blue-butterflies-326055/',
            name: 'Soham Mamdyal',
            rating: 4.5,
            phone: '123-456-7890',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC123',
            additionalDetails: 'Experienced driver with 5+ years of driving service.',
            sourceLocation: '', // Add this property to store source location
            destinationLocation: '',
          },
    },
    {
        id: 4,
        name: 'Uber Pet',
        seat: 4,
        desc: 'Affordable rides for you and your pet',
        amount: 1.4,
        image: '/UberX_Pet.png',
        driverInfo: {
            image: 'https://www.pexels.com/photo/close-up-photo-of-glowing-blue-butterflies-326055/',
            name: 'Soham Mamdyal',
            rating: 4.5,
            phone: '123-456-7890',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC123',
            additionalDetails: 'Experienced driver with 5+ years of driving service.',
            sourceLocation: '', // Add this property to store source location
            destinationLocation: '',
            
          },
    },
    {
        id: 5,
        name: 'Black',
        seat: 4,
        desc: 'Affordable, Everyday rides',
        amount: 1.1,
        image: '/Black_v1.png',
        driverInfo: {
            image: 'https://www.pexels.com/photo/close-up-photo-of-glowing-blue-butterflies-326055/',
            name: 'Soham Mamdyal',
            rating: 4.5,
            phone: '123-456-7890',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC123',
            additionalDetails: 'Experienced driver with 5+ years of driving service.',
            sourceLocation: '', // Add this property to store source location
            destinationLocation: '',
          },
    },
  ]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [newCar, setNewCar] = useState({
    id: '',
    name: '',
    seat: '',
    desc: '',
    amount: '',
    image: '',
    driverInfo: {
      image: '',
      name: '',
      rating: '',
      phone: '',
      make: '',
      model: '',
      year: '',
      plateNumber: '',
      additionalDetails: '',
      sourceLocation: '',
      destinationLocation: '',
      otherAction: 'Active',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      setNewCar((prevState) => ({
        ...prevState,
        [mainKey]: {
          ...prevState[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setNewCar((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setCars((prevCars) => prevCars.map((car) => (car.id === newCar.id ? newCar : car)));
      Swal.fire("Car updated successfully!", "Cab successfully added", "success");
    } else {
      setCars((prevCars) => [...prevCars, newCar]);
      Swal.fire("Car added successfully!", "Cab successfully added", "success");
    }
    setNewCar({
      id: '',
      name: '',
      seat: '',
      desc: '',
      amount: '',
      image: '',
      driverInfo: {
        image: '',
        name: '',
        rating: '',
        phone: '',
        make: '',
        model: '',
        year: '',
        plateNumber: '',
        additionalDetails: '',
        sourceLocation: '',
        destinationLocation: '',
        otherAction: 'Active',
      },
    });
    setFormVisible(false);
    setEditMode(false);
  };

  const handleRemove = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    Swal.fire("Car removed successful", "Cab successfully removed", "success");
  };

  const handleEdit = (car) => {
    setNewCar(car);
    setFormVisible(true);
    setEditMode(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headM}>Car Data</h1>
      <div className={styles.buttons}>
        <button onClick={() => setFormVisible(true)}>Add Car</button>
      </div>
      
      <div className={styles.search}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" />
      </div>
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <h2>{isEditMode ? 'Edit Car' : 'Add New Car'}</h2>
          <input
            type="text"
            name="id"
            value={newCar.id}
            onChange={handleInputChange}
            placeholder="ID"
            required
            disabled={isEditMode}
          />
          <input
            type="text"
            name="name"
            value={newCar.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="seat"
            value={newCar.seat}
            onChange={handleInputChange}
            placeholder="Seat"
            required
          />
          <input
            type="text"
            name="desc"
            value={newCar.desc}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="amount"
            value={newCar.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            name="image"
            value={newCar.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
          <input
            type="text"
            name="driverInfo.image"
            value={newCar.driverInfo.image}
            onChange={handleInputChange}
            placeholder="Driver Image URL"
            required
          />
          <input
            type="text"
            name="driverInfo.name"
            value={newCar.driverInfo.name}
            onChange={handleInputChange}
            placeholder="Driver Name"
            required
          />
          <input
            type="text"
            name="driverInfo.phone"
            value={newCar.driverInfo.phone}
            onChange={handleInputChange}
            placeholder="Driver Phone"
            required
          />
          <input
            type="text"
            name="driverInfo.model"
            value={newCar.driverInfo.model}
            onChange={handleInputChange}
            placeholder="Car Model"
            required
          />
          <input
            type="text"
            name="driverInfo.year"
            value={newCar.driverInfo.year}
            onChange={handleInputChange}
            placeholder="Car Year"
            required
          />
          <input
            type="text"
            name="driverInfo.plateNumber"
            value={newCar.driverInfo.plateNumber}
            onChange={handleInputChange}
            placeholder="Car Plate Number"
            required
          />
          <input
            type="text"
            name="driverInfo.sourceLocation"
            value={newCar.driverInfo.sourceLocation}
            onChange={handleInputChange}
            placeholder="Source Location"
          />
          <input
            type="text"
            name="driverInfo.destinationLocation"
            value={newCar.driverInfo.destinationLocation}
            onChange={handleInputChange}
            placeholder="Destination Location"
          />
          <button type="submit">{isEditMode ? 'Update Car' : 'Add Car'}</button>
          <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Seat</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Amount</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Driver Name</th>
            <th className={styles.th}>Driver Phone</th>
            <th className={styles.th}>Car model</th>
            <th className={styles.th}>Year</th>
            <th className={styles.th}>Car Plate Number</th>
            <th className={styles.th}>Source Location</th>
            <th className={styles.th}>Destination Location</th>
           
            <th className={styles.th}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className={styles.td}>{car.id}</td>
              <td className={styles.td}>{car.name}</td>
              <td className={styles.td}>{car.seat}</td>
              <td className={styles.td}>{car.desc}</td>
              <td className={styles.td}>{car.amount}</td>
              <td className={styles.td}>
                <img src={car.image} alt={car.name} className={styles.carImage} />
              </td>
              <td className={styles.td}>{car.driverInfo.name}</td>
              <td className={styles.td}>{car.driverInfo.phone}</td>
              <td className={styles.td}>{car.driverInfo.model}</td>
              <td className={styles.td}>{car.driverInfo.year}</td>
              <td className={styles.td}>{car.driverInfo.plateNumber}</td>
              <td className={styles.td}>{car.driverInfo.sourceLocation}</td>
              <td className={styles.td}>{car.driverInfo.destinationLocation}</td>
              
              <td className={styles.td}>
                <button className={styles.actionButtons} onClick={() => handleEdit(car)}>
                  Edit
                </button>
                <button className={styles.actionButton} onClick={() => handleRemove(car.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;