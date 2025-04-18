import { useEffect, useState } from 'react';
import { FaEnvelope, FaKey, FaTimes } from "react-icons/fa";
import { openResModal, openForgotModal, closeLoginModal } from '../../../../store/slices/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function LoginModal({ onClose }) {
    const [slideIn, setSlideIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setSlideIn(true), 10);
    }, []);

    const handleClose = () => {
        setSlideIn(false);
        setTimeout(() => onClose(), 300);
    };
    const dispatch = useDispatch();

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
            <div
                className={`position-absolute top-0 h-100 bg-black text-white transition-slide p-4 shadow`}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    right: slideIn ? '0' : '-400px',
                    transition: 'right 0.3s ease-in-out',
                }}
            >
                <button
                    className="btn btn-link text-white position-absolute end-0 top-0 mt-2 me-2"
                    onClick={handleClose}
                    style={{ background: "none", border: "none" }}
                >
                    <FaTimes />
                </button>

                <h2 className="text-center mb-4 mt-5">Login</h2>

                <form>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "#2d3748", border: "none" }}>
                                <FaEnvelope className="text-secondary" />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                style={{
                                    background: "#2d3748",
                                    border: "none",
                                    color: "#fffff",
                                    boxShadow: "none",
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "#2d3748", border: "none" }}>
                                <FaKey className="text-secondary" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                style={{
                                    background: "#2d3748",
                                    border: "none",
                                    color: "white",
                                    boxShadow: "none",
                                }}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 py-2 mb-3"
                        style={{
                            backgroundColor: "#e53e3e",
                            color: "white",
                            border: "none",
                        }}
                    >
                        Login
                    </button>
                </form>

                <div className="text-center">
                    <a
                        href="#"
                        onClick={() => {
                            dispatch(openForgotModal());
                        }}
                        className="text-white text-decoration-none d-block mb-2"
                    >
                        Forgot Password?
                    </a>

                    <p
                        className="text-white mb-0"
                        role="button"
                        onClick={() => {
                            dispatch(openResModal());
                            dispatch(closeLoginModal());
                        }}
                    >
                        Don't have an account?
                    </p>

                </div>
            </div>
        </div>
    );
}
