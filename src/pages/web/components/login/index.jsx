import { useEffect, useState } from 'react';
import { FaEnvelope, FaKey, FaTimes } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setModalState } from '../../../../store/slices/globalSlice';

export default function LoginModal() {
    const [slideIn, setSlideIn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setSlideIn(true), 10);
    }, []);

    const handleClose = () => {
        setSlideIn(false);
        setTimeout(() => {
            dispatch(setModalState({ modal: '', value: false }));
        }, 300);
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
            <div
                className={`position-absolute top-0 h-100 bg-black text-white p-4 shadow`}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    right: slideIn ? '0' : '-400px',
                    transition: 'right 0.3s ease-in-out',
                }}
            >
                {/* Close Button */}
                <button
                    className="btn btn-link text-white position-absolute end-0 top-0 mt-2 me-2"
                    onClick={handleClose}
                    style={{ background: "none", border: "none" }}
                >
                    <FaTimes />
                </button>

                {/* Title */}
                <h2 className="text-center mb-4 mt-5">Login</h2>

                {/* Form */}
                <form>
                    {/* Email Field */}
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
                                    color: "white",
                                    boxShadow: "none",
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
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

                    {/* Submit */}
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

                {/* Footer Links */}
                <div className="text-center">
                    <p
                        onClick={() => dispatch(setModalState({ modal: 'showForgetModal', value: true }))}
                        className="text-white text-decoration-none d-block mb-2"
                        style={{ cursor: 'pointer' }}
                    >
                        Forgot Password?
                    </p>
                    <p
                        className="text-white mb-0"
                        role="button"
                        onClick={() => dispatch(setModalState({ modal: 'showResModal', value: true }))}
                        style={{ cursor: 'pointer' }}
                    >
                        Don't have an account?
                    </p>
                </div>
            </div>
        </div>
    );
}
