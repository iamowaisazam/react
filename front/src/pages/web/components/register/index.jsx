import { useEffect, useState } from 'react';
import { FaEnvelope, FaKey, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../../../../store/slices/globalSlice';
import { register, setForm } from '../../../../store/slices/AuthSlice';

export default function RegisterModal() {
    const [slideIn, setSlideIn] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

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
            <div className={`position-absolute top-0 h-100 bg-black text-white transition-slide p-4 shadow`}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    right: slideIn ? '0' : '-400px',
                    transition: 'right 0.3s ease-in-out',
                }}>
                <button
                    className="btn btn-link text-white position-absolute end-0 top-0 mt-2 me-2"
                    onClick={handleClose}
                    style={{ background: "none", border: "none" }}
                >
                    <FaTimes />
                </button>

                <h2 className="text-center mb-4 mt-5">Sign Up</h2>
                <form>
                    {/* Username */}
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "#2d3748", border: "none" }}>
                                <i className="fas fa-user text-secondary"></i>
                            </span>
                            <input
                                type="text"
                                value={auth.form.name}
                                onChange={(e) => dispatch(setForm({name:'name',value:e.target.value}))}
                                className="form-control"
                                placeholder="Username"
                                style={{
                                    background: "#2d3748",
                                    border: "none",
                                    color: "white",
                                    boxShadow: "none",
                                }}/>
                        </div>
                        <p className='text-danger' >{auth.errors?.name}</p>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "#2d3748", border: "none" }}>
                                <FaEnvelope className="text-secondary" />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={auth.form.email}
                                onChange={(e) => dispatch(setForm({name:'email',value:e.target.value}))}
                                style={{
                                    background: "#2d3748",
                                    border: "none",
                                    color: "white",
                                    boxShadow: "none",
                                }}/>
                        </div>
                        <p className='text-danger' >{auth.errors?.email}</p>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" style={{ background: "#2d3748", border: "none" }}>
                                <FaKey className="text-secondary" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={auth.form.password}
                                onChange={(e) => dispatch(setForm({name:'password',value:e.target.value}))}
                                style={{
                                    background: "#2d3748",
                                    border: "none",
                                    color: "white",
                                    boxShadow: "none",
                                }}/>
                        </div>
                        <p className='text-danger' >{auth.errors?.password}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => dispatch(register())}
                        className="btn w-100 py-2 mb-3"
                        style={{
                            backgroundColor: "#e53e3e",
                            color: "white",
                            border: "none",
                        }}>
                        Register
                    </button>
                </form>

                <div className="text-center">
                    <p
                        onClick={() => {
                            dispatch(setModalState({ modal: 'showLoginModal', value: true }));
                        }}
                        className="text-white text-decoration-none d-block mb-2"
                        style={{ cursor: 'pointer' }}
                    >
                        Already have an account?
                    </p>
                </div>
            </div>
        </div>
    );
}
