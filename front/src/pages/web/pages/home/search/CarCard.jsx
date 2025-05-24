import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaGasPump, FaClock, FaCogs } from 'react-icons/fa';
const url = import.meta.env.VITE_API_URL || "";
export default function CarCard({ car }) {
  const navigate = useNavigate();

  return (
    <div className="card mb-4 shadow-sm" style={{ borderRadius: '15px', fontFamily: 'Poppins, sans-serif' }}>
      <div className="position-relative">
        <img
          src={url + car.image}
          className="card-img-top"
          alt={car.title}
          style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', objectFit: 'cover', height: '200px' }}
        />
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Featured</span>
        <span className="badge bg-dark position-absolute top-0 start-50 translate-middle-x mt-2">📷 {car.images.length}</span>
        <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">{car.year}</span>
      </div>

      <div className="card-body">
        <h6 className="text-muted text-truncate" style={{ maxWidth: '100%' }}>{car.slug}</h6>
        <h5 className="text-truncate" style={{ maxWidth: '100%' }}>{car.title}</h5>


        <div className="d-flex flex-wrap justify-content-between text-muted" style={{ fontSize: '14px', marginBottom: '10px', gap: '8px' }}>
          <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <FaCar size={16} style={{ marginRight: '5px' }} /> 10 kms
          </span>
          <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <FaGasPump size={16} style={{ marginRight: '5px' }} /> petrol
          </span>
          <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <FaClock size={16} style={{ marginRight: '5px' }} /> Used Car
          </span>
          <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <FaCogs size={16} style={{ marginRight: '5px' }} />transmission
          </span>
        </div>

        <h5 className="text-dark fw-bold">${car.price}</h5>

        <div className="d-flex align-items-center justify-content-between mt-3">
          <small className="text-muted text-truncate" style={{ maxWidth: '70%' }}>👤 {car.user.name}</small>
          <button onClick={() => navigate(`/detail/${car._id}`)} className="btn btn-outline-warning btn-sm">View More</button>
        </div>
      </div>
    </div>
  );
}
