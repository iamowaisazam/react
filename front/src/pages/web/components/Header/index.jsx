import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../login/index';
import RegisterModal from '../register/index';
import ForgotPasswordModal from '../forgot/index';
import { toggleMenu, setModalState } from '../../../../store/slices/globalSlice';
const path = import.meta.env.VITE_PATH || "";

export default function Header() {
  const dispatch = useDispatch();
  const { isMenuOpen, showLoginModal, showResModal, showForgetModal } = useSelector(state => state.ui);
  const height100 = { height: '50px' };

  return (
    <>
      <header className="bg-black text-white py-3 h-75 border-danger border-bottom border-3">
        <div className="container" style={height100}>
          <div className="d-flex justify-content-between align-items-center">

            {/* Logo */}
            <div className="d-flex align-items-center">
              <Link to="/" className="text-decoration-none">
                <div className="d-flex align-items-center">
                  <div className="me-2" style={height100}>
                    <img
                      src={path+'/images/Logo.jpg'}
                      alt="ACSA Logo"
                      width={60}
                      height={40}
                      className="img-fluid w-100"
                      style={height100}
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Hamburger for Mobile */}
            <button
              className="navbar-toggler d-md-none"
              type="button"
              onClick={() => dispatch(toggleMenu())}
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars text-white"></i>
            </button>

            {/* Desktop Navigation */}
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

            {/* Desktop CTA */}
            <div className="d-none d-md-flex">
              <button
                onClick={() => dispatch(setModalState({ modal: 'showLoginModal', value: true }))}
                className="btn btn-outline-warning btn-sm me-2"
              >Login</button>
              <button
                onClick={() => dispatch(setModalState({ modal: 'showResModal', value: true }))}
                className="btn btn-outline-warning btn-sm me-2"
              >Register</button>
              <Link className="btn btn-warning btn-sm">Add Listing</Link>
            </div>
          </div>

          {/* Mobile Drawer */}
          <div className={`d-md-none ${isMenuOpen ? 'd-block' : 'd-none'} mt-3`}>
            <nav>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-white" onClick={() => dispatch(toggleMenu())}>Home</Link></li>
                <li className="mb-2"><Link to="/about" className="text-white" onClick={() => dispatch(toggleMenu())}>About</Link></li>
                <li className="mb-2"><Link to="/services" className="text-white" onClick={() => dispatch(toggleMenu())}>Services</Link></li>
                <li className="mb-2"><Link to="/faq" className="text-white" onClick={() => dispatch(toggleMenu())}>Faq</Link></li>
                <li className="mb-2"><Link to="/contact" className="text-white" onClick={() => dispatch(toggleMenu())}>Contact</Link></li>
              </ul>
            </nav>
            <div className="mt-3">
              <button
                onClick={() => dispatch(setModalState({ modal: 'showLoginModal', value: true }))}
                className="btn btn-outline-warning btn-sm me-2"
              >Login</button>
              <button
                onClick={() => dispatch(setModalState({ modal: 'showResModal', value: true }))}
                className="btn btn-outline-warning btn-sm me-2"
              >Register</button>
              <Link className="btn btn-warning btn-sm">Add Listing</Link>
            </div>
          </div>
        </div>
      </header>

      {showLoginModal && <LoginModal />}
      {showResModal && <RegisterModal />}
      {showForgetModal && <ForgotPasswordModal />}
    </>
  );
}
