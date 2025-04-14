import React from 'react';

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
  return (
    <div style={filterBoxStyle}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Filters and Sort</strong>
        <span className="text-info" style={{ cursor: 'pointer' }}>Clear</span>
      </div>

      {["Make", "Models", "Body", "Fuel Type"].map((filter, i) => (
        <select key={i} className="form-select" style={selectStyle}>
          <option>{filter}</option>
        </select>
      ))}

      <label style={labelStyle}>Price:</label>
      <p className="text-white">$0 — $50000</p>

      <label className="text-white">Min Price</label>
      <input type="range" className="form-range text-warning" min="0" max="50000" />

      <label className="text-white mt-2">Max Price</label>
      <input type="range" className="form-range text-warning" min="0" max="50000" />

      {["Transmission", "Driver Type", "Door", "Cylinder", "Color"].map((filter, i) => (
        <select key={i} className="form-select" style={selectStyle}>
          <option>{filter}</option>
        </select>
      ))}

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
      <label style={labelStyle}>Single Select</label>
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
