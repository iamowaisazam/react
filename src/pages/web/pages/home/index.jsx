import { useState } from 'react'
import CarFilters from '../../components/car/CarFilters.jsx';
import CarList from '../..//components/car/CarList.jsx';


import lamborghini1 from '/src/assets/lamborghini.png'; 
import lamborghini2 from '/src/assets/ferrari.png';
import lamborghini3 from '/src/assets/tesla.png'; 
import bgImage from '/src/assets/background.avif'

 export default () => {
  const [filters, setFilters] = useState({
    brand: 'Infinity',
    model: 'Sedanx50',
    type: 'Door',
    color: 'Red',
    category: 'Sedan',
  });

  const containerStyle = {
   
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '100%',
    marginTop: '30px',
  };

  const selectStyle = {
    backgroundColor: '#1f2937',
    color: 'white',
    border: '1px solid #374151',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
  };

  const iconBtnStyle = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const cars = [
    {
      name: 'Aventador SVJ',
      brand: 'Lamborghini',
      img: lamborghini1,
    },
    {
      name: 'Huracán EVO',
      brand: 'Lamborghini',
      img: lamborghini2,
    },
    {
      name: 'Revuelto',
      brand: 'Lamborghini',
      img: lamborghini3,
    },
  ];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container bg-black">
 <div
      id="carCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: '550px', overflow: 'hidden' }}
    >
      <div className="carousel-inner h-100">
        {cars.map((car, index) => (
          <div
            className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
            key={index}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h2 style={{ color: '#d1d5db', fontSize: '2rem' }}>{car.brand}</h2>
            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>{car.name}</h1>
            <img
              src={car.img}
              alt={car.name}
              style={{ maxWidth: '350px', marginTop: '20px' }}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carCarousel"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bg-dark rounded-circle"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carCarousel"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bg-dark rounded-circle"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

      <div style={containerStyle}>
        <div className="row g-3">
          <div className="col-md-3 col-6">
            <select name="brand" value={filters.brand} onChange={handleChange} style={selectStyle}>
              <option>Infinity</option>
              <option>Audi</option>
              <option>BMW</option>
            </select>
          </div>

          <div className="col-md-3 col-6">
            <select name="model" value={filters.model} onChange={handleChange} style={selectStyle}>
              <option>Sedanx50</option>
              <option>Q7</option>
              <option>i8</option>
            </select>
          </div>

          <div className="col-md-3 col-6">
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleChange}
              placeholder="Door"
              style={selectStyle}
            />
          </div>

          <div className="col-md-3 col-6 d-flex align-items-center justify-content-end">
            <button style={iconBtnStyle}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>

          <div className="col-md-3 col-6">
            <select name="color" value={filters.color} onChange={handleChange} style={selectStyle}>
              <option>Red</option>
              <option>Black</option>
              <option>White</option>
            </select>
          </div>

          <div className="col-md-3 col-6">
            <select name="category" value={filters.category} onChange={handleChange} style={selectStyle}>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Truck</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-black text-white py-4">
      <div className="row">
        <div className="col-md-3">
          <CarFilters />
        </div>
        <div className="col-md-9">
          <CarList />
        </div>
      </div>
    </div>

    </div>

    
  );


}
