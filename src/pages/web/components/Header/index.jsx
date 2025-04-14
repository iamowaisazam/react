import { useState } from 'react';
import { Link } from 'react-router-dom'; 

export default ()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const height100 = {
    height: '50px',
  };
  

  return (
    <header className="bg-black text-white py-3 h-75 border-danger border-bottom border-3">
      <div className="container" style={height100}>
        <div className="d-flex justify-content-between align-items-center">
     
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex align-items-center">
                <div className="me-2" style={height100}>
                  <img
                    src="/src/assets/Logo.jpg"
                    alt="ACSA Logo"
                    width={60}
                    height={40}
                    className="img-fluid w-100" style={height100}
                  />
                </div>
                <div>
                  
                </div>
              </div>
            </Link>
          </div>


          <button
            className="navbar-toggler d-md-none"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars text-white"></i>
            </span>
          </button>


          <div className="d-none d-md-flex align-items-center">
            <nav>
              <ul className="list-unstyled d-flex mb-0">
                <li className="mx-3"><Link to="/" className="text-decoration-none text-white">Home</Link></li>
                <li className="mx-3"><Link to="/about" className="text-decoration-none text-white">About</Link></li>
                <li className="mx-3"><Link to="/services" className="text-decoration-none text-white">Services</Link></li>
                <li className="mx-3"><Link to="/faq" className="text-decoration-none text-white">Faq</Link></li>
                <li className="mx-3"><Link to="/contact" className="text-decoration-none text-white">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div className="d-none d-md-flex">
            <Link to="/login" className="btn btn-outline-warning btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-warning btn-sm me-2">Register</Link>
            <Link to="/add-listing" className="btn btn-warning btn-sm">Add Listing</Link>
          </div>
        </div>

    
        <div className={`d-md-none ${isMenuOpen ? 'd-block' : 'd-none'} mt-3`}>
          <nav>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-white" onClick={toggleMenu}>Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-decoration-none text-white" onClick={toggleMenu}>About</Link></li>
              <li className="mb-2"><Link to="/services" className="text-decoration-none text-white" onClick={toggleMenu}>Services</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-decoration-none text-white" onClick={toggleMenu}>Faq</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none text-white" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </nav>
          <div className="mt-3">
            <Link to="/login" className="btn btn-outline-warning btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-warning btn-sm me-2">Register</Link>
            <Link to="/add-listing" className="btn btn-warning btn-sm">Add Listing</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
