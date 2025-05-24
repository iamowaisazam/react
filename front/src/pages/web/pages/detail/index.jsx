import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById, fetchPostById } from '../../../../store/slices/postSlice';
import { FaTachometerAlt, FaCogs, FaGasPump, FaCarSide, FaCheckCircle, FaPhone, FaEnvelope, FaFlag, FaCar, FaClock } from 'react-icons/fa';
import ReportPopup from './popup';
const path = import.meta.env.VITE_PATH || "";
const url = import.meta.env.VITE_API_URL || "";
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector(state => selectPostById(state, id));
  const loading = useSelector(state => state.postState.loading);
  const error = useSelector(state => state.postState.error);

  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!post) return <div className="p-4">Post not found.</div>;


  const images = [
    post.image?.replace(/^\/+/, '/') || '',
    ...(post.images?.map(img => img.replace(/^\/+/, '/')) || [])
  ].filter(Boolean);

  const features = post.tags || [];


  const specs = [
    { label: "Body Type", value: post.features?.body || "N/A" },
    { label: "Fuel Type", value: post.features?.fuel_type || "N/A" },
    { label: "Transmission", value: post.features?.transmission || "N/A" },
    { label: "Doors", value: post.features?.door || "N/A" },
    { label: "Color", value: post.features?.color || "N/A" },
    { label: "Condition", value: post.features?.condition || "N/A" },
  ];


  const phoneNumber = post.user?.phone || "N/A";
  const email = post.user?.email || "N/A";


  const bgImage = path + '/images/banner.jpg';

  return (
    <div className="bg-black text-white pt-5 pb-4 px-3">
      <div
        className="text-center py-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className="text-warning fw-bold display-5">{post.title || "Vehicle Details"}</h2>
        <p className="mt-3 text-light">{post.description || "Discover the performance, features, and luxury of your dream car."}</p>
        <button className="btn btn-outline-light mt-3 px-4">Explore More Cars</button>
      </div>

      <div className="bg-black text-white px-3 py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-8">
              <div id="carImagesCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {images.length ? images.map((img, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img
                        src={url + img}
                        className="d-block w-100 rounded"
                        alt={`Car ${index + 1}`}
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )) : <div>No images available</div>}
                </div>
                {images.length > 1 && <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carImagesCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carImagesCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>}
              </div>


              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">{post.title}</h5>
                <div className="row text-center text-white">
                  <div className="col-3">
                    <FaTachometerAlt size={24} />
                    <p className="fw-bold mb-0">{post.kms || "N/A"}</p>
                    <small>Mileage</small>
                  </div>
                  <div className="col-3">
                    <FaCogs size={24} />
                    <p className="fw-bold mb-0">{post.features?.engine || "N/A"}</p>
                    <small>Engine</small>
                  </div>
                  <div className="col-3">
                    <FaGasPump size={24} />
                    <p className="fw-bold mb-0">{post.features?.fuel_type || "N/A"}</p>
                    <small>Fuel Type</small>
                  </div>
                  <div className="col-3">
                    <FaCarSide size={24} />
                    <p className="fw-bold mb-0">{post.features?.condition || "N/A"}</p>
                    <small>Condition</small>
                  </div>
                </div>
              </div>


              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">Key Features</h5>
                <div className="row">
                  {features.length > 0 ? features.map((feature, i) => (
                    <div className="col-md-6 mb-2" key={i}>
                      <FaCheckCircle className="text-warning me-2" />
                      {feature}
                    </div>
                  )) : <p>No features available.</p>}
                </div>
              </div>


              <div className="border-top border-white mt-4 pt-3">
                <h5 className="text-warning mb-3">Overview</h5>
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

              {/* Contact Us Text */}
              <div className="border-top border-white mt-4 pt-3">
                <div className="mt-5">
                  <h5 className="text-warning fw-bold border-bottom pb-2 mb-3">Contact Us</h5>
                  <p className="text-white-50" style={{ maxWidth: '90%' }}>
                    {post.description || "Please contact us for more information about this vehicle."}
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

                <button className="btn btn-danger w-100 mb-3">
                  <FaFlag className="me-2" /> Report Now
                </button>

                <ReportPopup />

                <div className="mt-4">
                  <h6 className="fw-bold text-warning">For More Inquiry</h6>
                  <p className="text-white-50">Choose this car to contact us easily.</p>

                  {[
                    { label: 'Name*', placeholder: 'Ex: John Numan' },
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
                      rows={4}
                      className="form-control"
                      placeholder="Write your message here"
                      style={{
                        backgroundColor: '#000',
                        border: '1px solid yellow',
                        color: 'white',
                      }}
                    />
                  </div>

                  <button className="btn btn-warning w-100">Send Inquiry</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
