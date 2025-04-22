import { useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const specs = [
  { label: 'Make', value: 'Lamborghini' },
  { label: 'Repair', value: 'No' },
  { label: 'Model', value: 'Lamborghini ave11' },
  { label: 'Steering', value: 'Right' },
  { label: 'Year/Month', value: '2023' },
  { label: 'Seating Capacity', value: '08' },
  { label: 'Mileage', value: '25,100 miles' },
  { label: 'Fuel Type', value: 'Petrol + Gas' },
  { label: 'No. of Cylinders', value: '03' },
];


export default function Detail  () {
  const navigate = useNavigate();
  
  
  const { id } = useParams();
  const cars = useSelector((state) => state.product.data);
  const car = cars.find((c) => String(c.id) === String(id));
  const suggestedCars = cars.filter((c) => c.type === car.type && c.id !== car.id);

  return (



    <div className="bg-black text-white pt-5 pb-4 px-3">
      <div
        className="text-center py-5"
        style={{
          backgroundImage: "url('/src/assets/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-warning fw-bold display-5">Vehicle Details</h2>
        <p className="mt-3 text-light">Discover the performance, features, and luxury of your dream car.</p>
        <button className="btn btn-outline-light mt-3 px-4">Explore More Cars</button>
      </div>


      <div className="bg-black text-white px-3 py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-8">
              <img
      src={`/images/${car.image.replace('./images/', '')}`}
                alt={car.name}
                className="img-fluid rounded"
              />

              {/* Car Info */}
              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">{car.name}</h5>
                <div className="row text-center text-white">
                  <div className="col-3">
                    <i className="fas fa-tachometer-alt"></i>
                    <p className="fw-bold mb-0">25,100 miles</p>
                    <small>Mileage</small>
                  </div>
                  <div className="col-3">
                    <i className="fas fa-cogs"></i>
                    <p className="fw-bold mb-0">22,231 cc</p>
                    <small>Engine</small>
                  </div>
                  <div className="col-3">
                    <i className="fas fa-gas-pump"></i>
                    <p className="fw-bold mb-0">Petrol + Gas</p>
                    <small>Fuel Type</small>
                  </div>
                  <div className="col-3">
                    <i className="fas fa-car-side"></i>
                    <p className="fw-bold mb-0">Used Car</p>
                    <small>Condition</small>
                  </div>
                </div>
              </div>

              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">Key Features</h5>
                <div className="row">
                  {[
                    'Premium Wheel',
                    'Front Heated Seats',
                    'Moonroof',
                    'Premium Seat Material',
                    'Premium Audio',
                    'Bluetooth',
                    'Remote Engine Start',
                    'Blind Spot System',
                  ].map((feature, i) => (
                    <div className="col-md-6 mb-2" key={i}>
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>


              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">Overview</h5>

                <div className="bg-black text-white px-3 py-5">
                  <div className="container">
                    <div className="row">

                      <div className="col-md-8 w-100">
                        <div className="row g-3">
                          {specs.map((item, index) => (
                            <div className="col-md-4" key={index}>
                              <div
                                style={{
                                  border: '1px solid white',
                                  padding: '10px 15px',
                                  borderRadius: '4px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <span className="fw-bold">{item.label}:</span>
                                <span>{item.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>



                      </div>


                    </div>
                  </div>
                </div>
              </div>
              <div className="border-top border-white mt-4 pt-3">
                <div className="mt-5">
                  <h5 className="text-warning fw-bold border-bottom pb-2 mb-3">Contact Us</h5>
                  <p className="text-white-50" style={{ maxWidth: '90%' }}>
                    accusamus corrupti eius assumenda, pariatur nihil deserunt repellat tenetur.
                    Atque corporis doloribus aperiam, est asperiores id. Quos voluptates a accusantium
                    distinctio, et cum explicabo quam asperiores nostrum. At distinctio dolor earum
                    veritatis voluptas.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="p-3 rounded"
                style={{ border: '1px solid white', backgroundColor: '#0f0f0f' }}
              >
                <button className="btn btn-warning w-100 mb-2">
                  <i className="fas fa-phone me-2"></i> Show Number
                </button>
                <button className="btn btn-outline-light w-100 mb-2">
                  <i className="fas fa-envelope me-2"></i> Email Now
                </button>
                <button className="btn btn-danger w-100 mb-3">
                  <i className="fas fa-flag me-2"></i> Report Now
                </button>

                {/* Form */}
                <div className="mt-4">
                  <h6 className="fw-bold text-warning">To More inquiry</h6>
                  <p className="text-white-50">If choose this car to contact easily with us.</p>

                  {[
                    { label: 'Name*', placeholder: 'Ex: Jhon Numan' },
                    { label: 'Email*', placeholder: 'Ex: info@gmail.com' },
                    { label: 'Phone*', placeholder: '(201) 555–0123' },
                  ].map((f, i) => (
                    <div className="mb-3" key={i}>
                      <label className="form-label text-white">{f.label}</label>
                      <input
                        className="form-control"
                        placeholder={f.placeholder}
                        style={{
                          backgroundColor: '#000',
                          border: '1px solid yellow',
                          color: 'white',
                        }}
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label className="form-label text-white">Message*</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Write your message"
                      style={{
                        backgroundColor: '#000',
                        border: '1px solid yellow',
                        color: 'white',
                      }}
                    ></textarea>
                  </div>

                  <button className="btn btn-warning w-100">Send Message</button>
                </div>
              </div>

              <div className="col-md-6 mx-auto mb-4 w-100">
                    <div
                      className="ratio ratio-16x9 mt-5"
                      style={{
                        overflow: 'hidden',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197068308716!2d-122.4324!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2b3d3b9a71%3A0x82b1d4f5b7b49b33!2sChurch%20Of%208%20Wheels%20Roller%20Disco!5e0!3m2!1sen!2sus!4v1712870440000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

            </div>
          </div>
        </div>
      </div>



      <div className="bg-black text-white px-3 pb-5">
        <div className="container">
          <h3 className="text-center mb-4 fw-bold border-bottom pb-2">
            <span className="border-bottom border-white">Suggested for you</span>
          </h3>

          <div className="row g-4">
            {suggestedCars.map((car, index) => (
              <div className="col-md-3" key={index}>
                <div className="card h-100 shadow-sm rounded-4">
                  <div className="position-relative">
                    <img src={`/images/${car.image.replace('./images/', '')}`}alt={car.name} className="card-img-top rounded-top-4" />
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                      Featured
                    </span>
                    <span className="badge bg-dark position-absolute top-0 start-50 translate-middle-x mt-2">
                      📷 6
                    </span>
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                      {car.year}
                    </span>
                  </div>

                  <div className="card-body px-3 py-3">
                    <small className="text-warning fw-bold">{car.type}</small>
                    <h6 className="fw-bold mt-1 mb-2 text-dark">{car.name}</h6>

                    <div className="d-flex align-items-center flex-wrap mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
                      <span className="me-3">🚗 {car.kms} kms</span>
                      <span className="me-3">⛽ {car.fuel}</span>
                      <span>⚙️ {car.transmission}</span>
                    </div>

                    <h6 className="fw-bold text-dark">{car.price}</h6>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-muted" style={{ fontSize: '0.9rem' }}>👤 {car.owner}</span>
                      <button onClick={() => navigate(`/detail/${car.id}`)}   className="btn btn-outline-warning btn-sm rounded-pill px-3">
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}