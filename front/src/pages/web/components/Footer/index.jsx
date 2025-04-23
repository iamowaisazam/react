import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default () => {
  const socialIcons = [
    { icon: <FaFacebookF /> },
    { icon: <FaInstagram /> },
    { icon: <FaTwitter /> },
  ];

  return (
    <footer className="bg-black text-white pt-4">
      <hr style={{ borderColor: '#fff', opacity: 0.2 }} />
      <div className="container py-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center text-md-start mb-3 mb-md-0">
            <span className="text-white">Copyright </span>
            <span className="fw-bold text-warning">2023 DRIVCO</span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <span className="me-3 fw-semibold text-white">Follow Us On :</span>
            <div className="d-flex gap-2">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid white',
                    borderRadius: '50%',
                    color: '#facc15',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
