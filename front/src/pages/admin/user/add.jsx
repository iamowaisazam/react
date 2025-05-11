import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../../features/usersApi.js';


export default function adduser() {

    const [createUser, { isLoading }] = useCreateUserMutation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!", {
                icon: "⚠️",
                style: { background: "#e74c3c", color: "white", fontWeight: "500" },
            });
            return;
        }

        try {
            const res = await createUser(formData).unwrap();
            toast.success("User created successfully!", {
                icon: "✅",
                style: { background: "#2ecc71", color: "white", fontWeight: "500" },
            });
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                rememberMe: false,
            });
        } catch (err) {
            console.error("Error creating user:", err);
            toast.error("Failed to create user!", {
                icon: "❌",
                style: { background: "#e67e22", color: "white", fontWeight: "500" },
            });
        }
    };


    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>User Management</h5>
                <div className="d-flex align-items-center gap-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small">
                            <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                            <li className="breadcrumb-item active text-primary" aria-current="page">User Management</li>
                        </ol>
                    </nav>
                </div>
            </div>


            <div className="container mt-5">
                <div className="card shadow-sm p-4">
                    <h4 className="fw-bold">Create User</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control form-control-animated"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                type="email"
                                className="form-control form-control-animated"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                className="form-control form-control-animated"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                className="form-control form-control-animated"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-check mb-4">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>

                        <button type="submit" className="btn btn-success me-2" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="reset" className="btn btn-dark" onClick={() => setFormData({
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            rememberMe: false
                        })}>Cancel</button>
                    </form>
                </div>

            </div>
        </main >
    );
}
