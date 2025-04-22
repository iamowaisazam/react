import { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function Users() {

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const employees = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    ];

    const handleDelete = (id) => {


        toast.info("User deleted successfully!", {
            icon: "🗑️",
            style: {
                background: "#00c4cc",
                color: "white",
                fontWeight: "500",
            }
        });
    };

    const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage);
    const displayedEmployees = sortedEmployees.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

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
                                    value={entriesPerPage}
                                    onChange={handleEntriesPerPageChange}
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
                                    value={searchTerm}
                                    onChange={handleSearch}
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
                                                    <span className="ms-1">{getSortIcon(col.toLowerCase().replace(" ", ""))}</span>
                                                </div>
                                            </th>
                                        ))}
                                        <th style={{ whiteSpace: "nowrap" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedEmployees.map((user) => (
                                        <tr key={user.id} className="table-row-custom">
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary animated-btn"
                                                        onClick={() => handleEdit(user.id)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger animated-btn"
                                                        onClick={() => handleDelete(user.id)}
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
                                Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, sortedEmployees.length)} of {sortedEmployees.length} entries
                            </div>
                            <div className="col-md-6">
                                <nav className="float-md-end">
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
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
