import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';


export default function Dashboard() {
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

                    <form>

                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaUser /></span>
                            <input type="text" className="form-control form-control-animated" placeholder="Username" />
                        </div>

                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input type="email" className="form-control form-control-animated" placeholder="Email" />
                        </div>


                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaLock /></span>
                            <input type="password" className="form-control form-control-animated" placeholder="Password" />
                        </div>


                        <div className="mb-3 input-group input-focus">
                            <span className="input-group-text"><FaLock /></span>
                            <input type="password" className="form-control form-control-animated" placeholder="Confirm Password" />
                        </div>


                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>

                        <button type="submit" className="btn btn-success me-2">Submit</button>
                        <button type="reset" className="btn btn-dark">Cancel</button>
                    </form>
                </div>

            </div>
        </main >
    );
}
