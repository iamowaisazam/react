import React from 'react';

export default function CarCard({ car }) {
  return (
    <div className="card mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
      <div className="position-relative">
        <img src={car.image} className="card-img-top" alt={car.name} />
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Featured</span>
        <span className="badge bg-dark position-absolute top-0 start-50 translate-middle-x mt-2">📷 6</span>
        <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">{car.year}</span>
      </div>
      <div className="card-body">
        <h6 className="text-muted">{car.type}</h6>
        <h5>{car.name}</h5>
        <p className="mb-1">
          <small>🚗 {car.kms} kms &nbsp;&nbsp;⛽ {car.fuel} &nbsp;&nbsp;⚙️ {car.transmission}</small>
        </p>
        <h5 className="text-dark fw-bold">${car.price}</h5>
        <div className="d-flex align-items-center justify-content-between">
          <small className="text-muted">👤 {car.owner}</small>
          <button className="btn btn-outline-warning btn-sm">View More</button>
        </div>
      </div>
    </div>
  );
}
