import { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useGetUsersQuery } from '../../../../features/usersApi.js';

export default function Users() {

    const { data, error, isLoading } = useGetUsersQuery();
    const users = data?.data || [];

    return (

        <main >
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>
                    User Management
                </h5>

                <div className="d-flex align-items-center gap-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small">
                            <li className="breadcrumb-item">
                                <a href="#" className="text-muted text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item active text-primary" aria-current="page">
                                User Management
                            </li>
                        </ol>
                    </nav>


                </div>
            </div>
            <main className="flex-grow-1 p-4" style={{ background: "#f3f7fa", minHeight: "100vh" }}>
                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body">




                        <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                            <div className="d-flex align-items-center mb-2 mb-md-0">
                                <label className="me-2 mb-0">Show</label>
                                <select
                                    className="form-select form-select-sm"
                                    style={{ width: "80px" }}


                                >
                                    {[10, 25, 50, 100].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                                <label className="ms-2 mb-0">entries</label>
                            </div>

                            <div className="d-flex align-items-center">
                                <label className="me-2 mb-0">Search:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: "200px" }}


                                />
                            </div>
                        </div>


                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        {["User ID", "Name", "Email", "Role"].map(col => (
                                            <th
                                                key={col}
                                                onClick={() => requestSort(col.toLowerCase().replace(" ", ""))}
                                                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {col}
                                                    <span className="ms-1"></span>
                                                </div>
                                            </th>
                                        ))}
                                        <th style={{ whiteSpace: "nowrap" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="table-row-custom">
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary animated-btn"
                                                        onClick={() => handleEdit(user._id)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger animated-btn"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        🗑 Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>


                        <div className="row align-items-center mt-3">
                            <div className="col-md-6 small text-muted">

                            </div>
                            <div className="col-md-6">
                                <nav className="float-md-end">
                                    <ul className="pagination pagination-sm mb-0">
                                        <li >
                                            <button className="page-link" >Previous</button>
                                        </li>

                                        <li >
                                            <button className="page-link">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
        </main>
    );
}
