import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../../../store/slices/counterSlice.js';

import CarFilters from '../../components/car/CarFilters.jsx';
import CarList from '../..//components/car/CarList.jsx';

import Slider from './slider/index.jsx';


 export default function Home () {

  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container bg-black">

       <Slider />
  
    {/* <div className="App bg-danger" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div> */}

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
