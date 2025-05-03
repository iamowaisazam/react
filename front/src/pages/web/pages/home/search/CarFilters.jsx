import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, searchCar } from '../../../../../store/slices/productSlice';
const filterBoxStyle = {
  border: '2px solid yellow',
  padding: '15px',
  borderRadius: '10px',
};

const selectStyle = {
  background: 'black',
  color: 'white',
  border: '1px solid yellow',
  marginBottom: '10px',
};

const labelStyle = {
  color: 'yellow',
  fontWeight: 'bold',
  marginTop: '15px',
};

export default function CarFilters() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    brand: 'Infinity',
    model: 'Sedanx50',
    type: 'Door',
    color: 'Red',
    category: 'Sedan',
  })
  const data = useSelector((state) => state.product);

  const cars = useSelector((state) => state.product.full);
  const prices = cars.map(c => c.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const colors = useSelector((state) => state.color.data);

  return (
    <div style={filterBoxStyle}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Filters and Sort</strong>
        <span className="text-info" style={{ cursor: 'pointer' }}>Clear</span>
      </div>




      <select
        name="country"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'country', value: e.target.value }));
          dispatch(searchCar());
        }}
        value={data.filters.country}
        className="form-select"
        style={selectStyle}
      >
        <option value="">Select Country</option>
        <option value="pakistan">Pakistan</option>
        <option value="india">India</option>
        <option value="uae">UAE</option>
      </select>
      {/* State */}
      <select
        name="state"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'state', value: e.target.value }));
          dispatch(searchCar());
        }}
        value={data.filters.state}
        className="form-select mt-3"
        style={selectStyle}
      >
        <option value="">Select State</option>
        <option value="punjab">Punjab</option>
        <option value="sindh">Sindh</option>
        <option value="kpk">KPK</option>
        <option value="balochistan">Balochistan</option>
      </select>

      {/* City */}
      <select
        name="city"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'city', value: e.target.value }));
          dispatch(searchCar());
        }}
        value={data.filters.city}
        className="form-select mt-3"
        style={selectStyle}
      >
        <option value="">Select City</option>
        <option value="lahore">Lahore</option>
        <option value="karachi">Karachi</option>
        <option value="islamabad">Islamabad</option>
      </select>

      {/* Area */}
      {/* <select
        name="area"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'area', value: e.target.value }));
          dispatch(searchCar());
        }}
        value={data.filters.area}
        className="form-select mt-3"
        style={selectStyle}
      >
        <option value="">Select Area</option>
        <option value="dha">DHA</option>
        <option value="gulberg">Gulberg</option>
        <option value="bahria">Bahria Town</option>
      </select> */}





      <label style={labelStyle}>Price:</label>
      <p className="text-white">
        ${minPrice.toLocaleString()} — ${maxPrice.toLocaleString()}
      </p>
      <label className="text-white">Min Price: ${data.filters.minrange}</label>
      <input
        type="range"
        className="form-range text-warning"
        min={minPrice}
        max={maxPrice}
        step="100"
        value={data.filters.minrange}
        onChange={(e) => {
          dispatch(setFilter({ filter: 'minrange', value: parseInt(e.target.value) }));
          dispatch(searchCar());
        }}
      />

      <label className="text-white mt-2">Max Price: ${data.filters.maxrange}</label>
      <input
        type="range"
        className="form-range text-warning"
        min={minPrice}
        max={maxPrice}
        step="100"
        value={data.filters.maxrange}
        onChange={(e) => {
          dispatch(setFilter({ filter: 'maxrange', value: parseInt(e.target.value) }));
          dispatch(searchCar());
        }}
      />







      {/* <select name="driver_type"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'driver_type', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.driver_type}
        className="form-select"
        style={selectStyle}>
        <option value="">Driver Type</option>
        <option value={1}>FWD</option>
        <option value={2}>RWD</option>
        <option value={3}>AWD</option>
      </select> */}




      {/* <select name="cylinder"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'cylinder', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.cylinder}
        className="form-select"
        style={selectStyle}>
        <option value="">Cylinder</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={6}>6</option>
        <option value={8}>8</option>
      </select> */}



      <select name="category"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'category', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.category}
        className="form-select"
        style={selectStyle}>
        <option value="">Select body</option>
        <option value={1}>Sedan</option>
        <option value={2}>SUV</option>
        <option value={3}>Truck</option>
      </select>


      <select name="fuel"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'fuel', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.fuel}
        className="form-select"
        style={selectStyle}>
        <option value="">Select Fuel Type</option>
        <option value={1}>Petrol</option>
        <option value={2}>Diesel</option>
        <option value={3}>Electric</option>
        <option value={4}>Hybrid</option>
      </select>

      <select name="transmission"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'transmission', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.transmission}
        className="form-select"
        style={selectStyle}>
        <option value="">Select Transmission</option>
        <option value={"Automatic"}>Automatic</option>
        <option value={"Manual"}>Manual</option>

      </select>

      <select name="door"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'door', value: e.target.value || '' }));
          dispatch(searchCar());
        }}

        value={data.filters.door}
        className="form-select"
        style={selectStyle}>
        <option value="">Select Door</option>
        <option value={2} >2</option>
        <option value={4} >4</option>
      </select>
      <select name="color"
        onChange={(e) => {
          dispatch(setFilter({ filter: 'color', value: e.target.value }));
          dispatch(searchCar());
        }}
        value={data.filters.color}
        className="form-select"
        style={selectStyle}>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>






      <label style={labelStyle}>Featured</label>
      <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="ac" />
        <label className="form-check-label" htmlFor="ac">A/C: Front</label>
      </div>
      <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="camera" />
        <label className="form-check-label" htmlFor="camera">Backup Camera</label>
      </div>
      <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="cruise" />
        <label className="form-check-label" htmlFor="cruise">Cruise Control</label>
      </div>
      <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="nav" />
        <label className="form-check-label" htmlFor="nav">Navigation</label>
      </div>

    </div>
  );
}
