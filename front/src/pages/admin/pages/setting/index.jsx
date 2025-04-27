import { useState } from 'react';
import { toast } from 'react-toastify';

export default function GeneralSetting() {
    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>General Setting</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-muted text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add General Setting</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New General Setting</h4>

                        <form>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Setting Name</label>
                                <input type="text" className="form-control" placeholder="Enter setting name" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Setting Key</label>
                                <input type="text" className="form-control" placeholder="Enter setting key" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Setting Value</label>
                                <textarea className="form-control" rows="3" placeholder="Enter setting value"></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Status</label>
                                <select className="form-select">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-end pt-3 border-top mt-4">
                                <button type="submit" className="btn btn-dark px-4">Add General Setting</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    );
}

