import { useState } from "react";

export default ()=>{
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
            <h2 className="text-warning fw-bold display-5">For Any Information</h2>
            <p className="mt-3 text-light">Reach out to us directly for further assistance.</p>
            <button className="btn btn-outline-light mt-3 px-4">Contact Us</button>
          </div>
    
          <div className="container my-5">
            <div className="row text-center g-4">
              {[
                {
                  title: 'Dhaka, Bangladesh',
                  phone1: '+880 658 111 885',
                  phone2: '+880 677 177 876',
                  address: 'Canada City, Office-02, Road-11,\nHouse-38/a, Section-11',
                },
                {
                  title: 'New York, USA',
                  phone1: '+1 212 555 1234',
                  phone2: '+1 718 555 6789',
                  address: 'Canada City, Office-02, Road-11,\nHouse-38/a, Section-11',
                },
                {
                  title: 'Berlin, Germany',
                  phone1: '+49 30 1234 5678',
                  phone2: '+49 178 9876 5432',
                  address: 'Canada City, Office-02, Road-11,\nHouse-38/a, Section-11',
                },
              ].map((item, idx) => (
                <div className="col-md-4" key={idx}>
                  <div
                    style={{
                      border: '2px solid white',
                      borderRadius: '15px',
                      padding: '20px',
                      height: '100%',
                    }}
                  >
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="mb-1"><i className="fas fa-phone text-warning"></i> {item.phone1}</p>
                    <p><i className="fas fa-phone text-warning"></i> {item.phone2}</p>
                    <p className="text-white-50">
                      <i className="fas fa-map-marker-alt text-warning me-1"></i> {item.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          <div className="container">
            <div className="row g-4">
  
              <div className="col-md-6">
                <h5 className="fw-bold text-white">Contact Us With Support Line</h5>
                <div className="border p-3 rounded my-3">
                  <span className="text-warning fw-bold">To know more</span>
                  <br />
                  <span>Email Now :</span> <br />
                  <span className="fw-bold text-white">info@example.com</span>
                </div>
    
                <div className="border p-3 rounded my-3">
                  <span className="text-warning fw-bold">Shop Address</span>
                  <br />
                  <span>Location</span> <br />
                  <span className="fw-bold text-white">Road-03, House-123/124, New York.</span>
                </div>
    
                <p className="text-white-50 mt-4">
                  <small><strong>NB:</strong> Customer support always open at 9 am to 8 pm.</small>
                </p>
              </div>
    
         
              <div className="col-md-6">
                <form
                  style={{
                    border: '1px solid white',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  {[
                    { label: 'Full Name', placeholder: 'Your name' },
                    { label: 'Phone No', placeholder: 'Your contact' },
                    { label: 'Email', placeholder: 'Your Email Address' },
                    { label: 'Subject', placeholder: 'Subject' },
                  ].map((field, i) => (
                    <div className="mb-3" key={i}>
                      <label className="form-label text-white">{field.label}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={field.placeholder}
                        style={{ backgroundColor: 'black', border: '1px solid yellow', color: 'white' }}
                      />
                    </div>
                  ))}
    
                  <div className="mb-3">
                    <label className="form-label text-white">Short Note</label>
                    <textarea
                      className="form-control"
                      placeholder="Short Note"
                      rows="4"
                      style={{ backgroundColor: 'black', border: '1px solid yellow', color: 'white' }}
                    ></textarea>
                  </div>
    
                  <button className="btn btn-outline-warning px-4" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}