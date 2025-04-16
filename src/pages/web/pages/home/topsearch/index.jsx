import { useState } from 'react'

import { useSelector } from 'react-redux';

 export default function topsearch () {
    const containerStyle = {
   
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '100%',
        marginTop: '30px',
      };

      const [filters, setFilters] = useState({
        brand: 'Infinity',
        model: 'Sedanx50',
        type: 'Door',
        color: 'Red',
        category: 'Sedan',
      });
      const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
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

      
      const colors = useSelector((state) => state.color.data);

return (
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
      <select
        name="color"
        value={filters.color}
        onChange={handleChange}
        style={selectStyle}
      >
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.name}>
            {color.name}
          </option>
        ))}
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
);

 }