import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { createUser } from './userFeature.js';


export default function adduser() {

    const [state, setState] = useState({
        loading: '',
        errors: {},
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await createUser(formData);

            if (res.data.success) {
                toast.success("User created successfully!");
                setFormData({ name: '', email: '', password: '', role: '' });
                setState({ ...state, loading: false });
            } else {
                setState({ ...state, errors: {}, loading: false });
                toast.error("Failed to create user!");
            }

        } catch (error) {

            setState({ ...state, errors: error.response.data.errors ?? {}, loading: false });
            toast.error("Validation failed. Please check the fields.");
            console.error("API Error:", error.response?.data);
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
                        <div className="mb-3">
                            <label className="form-label fw-bold">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {state.errors?.name && <small className="text-danger">{state.errors.name}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {state.errors?.email && <small className="text-danger">{state.errors.email}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Role</label>
                            <select
                                className="form-control"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="">Select role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {state.errors?.role && <small className="text-danger">{state.errors.role}</small>}
                        </div>


                        <div className="mb-4">
                            <label className="form-label fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {state.errors?.password && <small className="text-danger">{state.errors.password}</small>}
                        </div>

                        <div className="d-flex">
                            <button
                                type="submit"
                                className="btn btn-success w-10 me-2"
                                disabled={state.loading}
                            >
                                {state.loading ? 'Submitting...' : 'Submit'}
                            </button>
                            <Link to="/admin/users" className="btn btn-secondary w-10">
                                Cancel
                            </Link>
                        </div>
                    </form>


                </div>

            </div>
        </main >
    );
}
