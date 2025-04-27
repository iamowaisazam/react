import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function CategoryMenu() {
    const [categories, setCategories] = useState([
        { id: 1, name: "Car", slug: "car", status: "Active" },
        { id: 2, name: "Bike", slug: "bike", status: "Inactive" },
        { id: 3, name: "Truck", slug: "truck", status: "Active" },
        { id: 4, name: "Bus", slug: "bus", status: "Active" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleDelete = (id) => {
        toast.info("Category deleted successfully!", {
            icon: "🗑️",
            style: {
                background: "#00c4cc",
                color: "white",
                fontWeight: "500",
            }
        });
    };

    const handleToggleStatus = (id) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === id
                    ? { ...category, status: category.status === 'Active' ? 'Inactive' : 'Active' }
                    : category
            )
        );

        toast.success("Status updated!", {
            icon: "🔄",
            style: {
                background: "#0d6efd",
                color: "white",
                fontWeight: "500",
            }
        });
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm) ||
            category.slug.toLowerCase().includes(searchTerm) ||
            category.status.toLowerCase().includes(searchTerm)
        );
    }, [categories, searchTerm]);

    const sortedCategories = useMemo(() => {
        if (!sortConfig.key) return filteredCategories;
        return [...filteredCategories].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredCategories, sortConfig]);

    const totalPages = Math.ceil(sortedCategories.length / entriesPerPage);
    const displayedCategories = sortedCategories.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Categories</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-muted text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Categories</li>
                    </ol>
                </nav>
            </div>

            <main className="flex-grow-1 p-4" style={{ background: "#f3f7fa", minHeight: "100vh" }}>
                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body">

                        {/* Controls */}
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

                        {/* Table */}
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        {["ID", "Name", "Slug", "Status"].map(col => (
                                            <th
                                                key={col}
                                                onClick={() => requestSort(col.toLowerCase())}
                                                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {col}
                                                    <span className="ms-1">{getSortIcon(col.toLowerCase())}</span>
                                                </div>
                                            </th>
                                        ))}
                                        <th style={{ whiteSpace: "nowrap" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedCategories.map((category) => (
                                        <tr key={category.id} className="table-row-custom">
                                            <td>{category.id}</td>
                                            <td>{category.name}</td>
                                            <td>{category.slug}</td>
                                            <td>
                                                <div
                                                    onClick={() => handleToggleStatus(category.id)}
                                                    style={{
                                                        position: "relative",
                                                        width: "44px",
                                                        height: "24px",
                                                        borderRadius: "999px",
                                                        backgroundColor: category.status === "Active" ? "#00c4cc" : "#6c757d",
                                                        cursor: "pointer",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "2px",
                                                            left: category.status === "Active" ? "22px" : "2px",
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "50%",
                                                            backgroundColor: "#f1f1f1",
                                                            transition: "all 0.3s ease"
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-primary">✎ Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category.id)}>🗑 Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="row align-items-center mt-3">
                            <div className="col-md-6 small text-muted">
                                Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, sortedCategories.length)} of {sortedCategories.length} entries
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
