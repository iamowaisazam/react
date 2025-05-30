import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById, fetchPostById } from '../../../../store/slices/postSlice';
import { FaTachometerAlt, FaCogs, FaGasPump, FaCarSide, FaCheckCircle, FaPhone, FaEnvelope, FaFlag, FaCar, FaClock } from 'react-icons/fa';
import ReportPopup from './popup';
import api from "../../../../utils/apiClient";

const path = import.meta.env.VITE_PATH || "";
const url = import.meta.env.VITE_API_URL || "";

export default function Detail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector(state => state.postState.post);
  const loading = useSelector(state => state.postState.postLoading);
  const error = useSelector(state => state.postState.postError);
  
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  

  useEffect(() => {
    
      if(id) {
         
         
         dispatch(fetchPostById(id));
        
      }

    

  }, [id, dispatch]);


   useEffect(() => {
    
      console.log(post);
      

  }, [post]);




  if (loading) return <div className="p-4 text-white text-center">Loading...</div>;
  if (error) return <div className="p-4 text-white text-center">Error: {error}</div>;
  if (!post) return <div className="p-4 text-white text-center ">Post not found.</div>;

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
        }}>
        <h2 className="text-warning fw-bold display-5">{"Vehicle Details"}</h2>
        <p className="mt-3 text-light">{"Discover the performance, features, and luxury of your dream car."}</p>
        <button className="btn btn-outline-light mt-3 px-4">Explore More Cars</button>
      </div>

      <div className="bg-black text-white px-3 py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-8">
              <div id="carImagesCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {post.images.split(',').length ? post.images.split(',').map((img, index) => (
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
                {post.images.split(',').length > 1 && <>
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
                  {/* {
                    post.specs ?
                  
                      <div className="row text-center text-white">
                            { 
                              post.specs.map((spec, i) => (
                              <div className="col-3">
                                <FaTachometerAlt size={24} />
                                <p className="fw-bold mb-0">{post.value}</p>
                                <small>{spec.title}</small>
                              </div>
                            ))
                          }
                      </div>
                 : ''} */}
              </div>

                   {
                    Array.isArray(post.tags) ?
                      <div className="border-top border-white mt-4 pt-3">
                        <h5 className="text-warning mb-3">Key Features</h5>
                        <div className="row">
                          { 
                            post.tags.map((feature, i) => (
                            <div className="col-md-6 mb-2" key={i}>
                              <FaCheckCircle className="text-warning me-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div> : <p>No features available.</p>
                }

                <div className="border-top border-white mt-4 pt-3">
                  <h5 className="text-warning mb-3">Overview</h5>
                   {Array.isArray(post.features) ?
                  <div className="row g-3">
                    {  post.features.map((value,key) => (
                      <div className="col-12 col-sm-6 col-md-4" key={key} >
                        <div className="border border-light rounded p-3 d-flex justify-content-between h-100">
                          <span className="fw-bold">{value.title}:</span>
                          <span>{value.value}</span>
                        </div>
                      </div>  
                    ))  
                  }
                  </div> : ''
                  }
                </div>

                {/* Contact Us Text */}
                <div className="border-top border-white mt-4 pt-3">
                  <div className="mt-5">
                    <h5 className="text-warning fw-bold border-bottom pb-2 mb-3">Description</h5>
                    <p className="text-white-50" style={{ maxWidth: '90%' }}>
                      {post.description}
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
                  {showPhone ? post?.userId?.phone  : "Show Number"}
                </button>

                <button
                  className="btn btn-outline-light w-100 mb-2"
                  onClick={() => setShowEmail(!showEmail)}
                >
                  <FaEnvelope className="me-2" />
                  {showEmail ? post?.userId?.email : "Email Now"}
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
