import React from 'react';

export default () => {
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
              {[
                { icon: 'fab fa-facebook-f' },
                { icon: 'fab fa-instagram' },
                { icon: 'fab fa-twitter' },
              ].map((social, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid white',
                    borderRadius: '50%',
                    color: '#facc15', // yellow-400
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <i className={social.icon}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
