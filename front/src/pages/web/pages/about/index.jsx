import { useState } from 'react'
const path = import.meta.env.VITE_PATH || "";
export default () => {
  const bgImage = path + '/images/banner.jpg';
  return (
    <div className="bg-black text-white">

      <div
        className="text-center text-white py-5"
        style={{

          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="fw-bold text-warning" style={{ fontSize: '3rem' }}>
          Our Brief History
        </h2>
        <p className="mt-3 px-3" style={{ maxWidth: '600px', margin: 'auto' }}>
          Explore our journey and discover insights about our mission, vision, and values.
        </p>
        <button className="btn btn-outline-light mt-3 px-4">See More</button>
      </div>

      {/* Welcome Text Section */}
      <div className="text-center py-5 px-3">
        <p className="text-warning fw-bold mb-1">(Since–1994)</p>
        <h3 className="fw-bold">Welcome To Drivco</h3>
        <p className="mt-3" style={{ maxWidth: '800px', margin: 'auto', lineHeight: '1.8' }}>
          We’re passionate car agency we’re thrilled to have you join our community of automotive
          enthusiasts and professionals. Whether you're a passionate driver, car owner, or someone
          who loves all things automotive, you've come to the right place! At Drivco, we strive to
          create a space where people can connect, share knowledge, and explore the exciting world
          of automobiles. From discussing the latest car models and technologies to sharing driving
          tips and tricks, we’re here to fuel your love for everything on wheels!
        </p>
      </div>

      {/* Why Choose Section */}
      <div className="text-center pb-5 px-3">
        <h4 className="text-white">Best Car Agency</h4>
        <h3 className="fw-bold text-warning mb-4">Why Only Choose Drivco</h3>

        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              {
                title: 'Affordable Price',
                desc: 'An affordable price for a luxury car may be significantly higher than the most affordable price for a budget car.',
                icon: 'fa-tags',
              },
              {
                title: 'Money Back Guarantee',
                desc: 'Some may offer a full refund with no questions asked. Others may require the customer to provide...',
                icon: 'fa-undo',
              },
              {
                title: '8 Month Warranty',
                desc: 'During this 8-month period, if the product fails to function properly due to a defect or malfunction...',
                icon: 'fa-shield-alt',
              },
            ].map((box, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="p-4 h-100"
                  style={{
                    border: '2px solid white',
                    borderRadius: '15px',
                    backgroundColor: '#0f0f0f',
                  }}
                >
                  <div className="text-warning mb-2">
                    <i className={`fas ${box.icon} fa-2x`}></i>
                  </div>
                  <h5 className="fw-bold text-white">{box.title}</h5>
                  <p className="mt-2 text-white-50" style={{ fontSize: '0.95rem' }}>
                    {box.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="row text-center text-white mt-5">
            {[
              { icon: 'fa-car', label: '600K+ Car Available' },
              { icon: 'fa-check-circle', label: '104K+ Car Sold' },
              { icon: 'fa-warehouse', label: '100K+ Used Cars' },
              { icon: 'fa-smile', label: '98.50% Customer Satisfaction' },
            ].map((item, idx) => (
              <div className="col-md-3 mb-3" key={idx}>
                <div className="text-warning mb-1">
                  <i className={`fas ${item.icon} fa-lg`}></i>
                </div>
                <span className="d-block">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


}
