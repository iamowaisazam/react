import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { openReportPopup } from '../../../../store/slices/reportpopupslice'
import ReportPopup from './popup';
import { FaTachometerAlt, FaCogs, FaGasPump, FaCarSide, FaCheckCircle, FaPhone, FaEnvelope, FaFlag, FaCar, FaClock } from 'react-icons/fa';
const path = import.meta.env.VITE_PATH || "";
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


export default function Detail() {
  const navigate = useNavigate();

  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);


  const phoneNumber = "(123) 123-1234";
  const email = "test@test.com";
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openReportPopup());
  };

  const { id } = useParams();
  const cars = useSelector((state) => state.product.data);
  const car = cars.find((c) => String(c.id) === String(id));
  const suggestedCars = cars.filter((c) => c.type === car.type && c.id !== car.id);
  const bgImage = path + '/images/banner.jpg';
  return (



    <div className="bg-black text-white pt-5 pb-4 px-3">
      <div
        className="text-center py-5"
        style={{
          backgroundImage: `url(${bgImage})`,
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
              <div id="carImagesCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {[car.image, ...(car.gallery || [])].map((img, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img
                        src={img.replace('./images/', '/images/')}
                        className="d-block w-100 rounded"
                        alt={`Car ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carImagesCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carImagesCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>


              {/* Car Info */}
              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">{car.name}</h5>
                <div className="row text-center text-white">
                  <div className="col-3">
                    <FaTachometerAlt size={24} />
                    <p className="fw-bold mb-0">25,100 miles</p>
                    <small>Mileage</small>
                  </div>
                  <div className="col-3">
                    <FaCogs size={24} />
                    <p className="fw-bold mb-0">22,231 cc</p>
                    <small>Engine</small>
                  </div>
                  <div className="col-3">
                    <FaGasPump size={24} />
                    <p className="fw-bold mb-0">Petrol + Gas</p>
                    <small>Fuel Type</small>
                  </div>
                  <div className="col-3">
                    <FaCarSide size={24} />
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
                      <FaCheckCircle className="text-warning me-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">Overview</h5>

                <div className="bg-black text-white">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <div className="row g-3">
                          {specs.map((item, index) => (
                            <div className="col-12 col-sm-6 col-md-4" key={index}>
                              <div className="border border-light rounded p-3 d-flex justify-content-between h-100">
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


                <button
                  className="btn btn-warning w-100 mb-2"
                  onClick={() => setShowPhone(!showPhone)}
                >
                  <FaPhone className="me-2" />
                  {showPhone ? phoneNumber : "Show Number"}
                </button>


                <button
                  className="btn btn-outline-light w-100 mb-2"
                  onClick={() => setShowEmail(!showEmail)}
                >
                  <FaEnvelope className="me-2" />
                  {showEmail ? email : "Email Now"}
                </button>

                <button className="btn btn-danger w-100 mb-3" onClick={handleClick}>
                  <FaFlag className="me-2" /> Report Now
                </button>

                <ReportPopup />
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
                    <img
                      src={car.image}
                      alt={car.name}
                      className="card-img-top rounded-top-4"
                    />

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

                  <div className="card-body">
                    <h6 className="text-muted text-truncate" style={{ maxWidth: '100%' }}>{car.type}</h6>
                    <h5 className="text-truncate" style={{ maxWidth: '100%' }}>{car.name}</h5>


                    <div className="d-flex flex-wrap justify-content-between text-muted" style={{ fontSize: '14px', marginBottom: '10px', gap: '8px' }}>
                      <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <FaCar size={16} style={{ marginRight: '5px' }} /> {car.kms} kms
                      </span>
                      <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <FaGasPump size={16} style={{ marginRight: '5px' }} /> {car.fuel}
                      </span>
                      <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <FaClock size={16} style={{ marginRight: '5px' }} /> Used Car
                      </span>
                      <span className="d-flex align-items-center" style={{ minWidth: '45%', maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <FaCogs size={16} style={{ marginRight: '5px' }} /> {car.transmission}
                      </span>
                    </div>

                    <h5 className="text-dark fw-bold">${car.price}</h5>

                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <small className="text-muted text-truncate" style={{ maxWidth: '70%' }}>👤 {car.owner}</small>
                      <button onClick={() => navigate(`/detail/${car.id}`)} className="btn btn-outline-warning btn-sm">View More</button>
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