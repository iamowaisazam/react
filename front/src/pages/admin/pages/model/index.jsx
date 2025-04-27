import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function CategoryMenu() {
    const [categories, setCategories] = useState([
        { id: 1, category: "Vehicle", make: "Vehicle", title: "Car", date: "2024-04-25", status: "Active" },
        { id: 2, category: "Vehicle", make: "Vehicle", title: "Bike", date: "2024-04-24", status: "Inactive" },
        { id: 3, category: "Heavy Vehicle", make: "Vehicle", title: "Truck", date: "2024-04-23", status: "Active" },
        { id: 4, category: "Public Transport", make: "Vehicle", title: "Bus", date: "2024-04-22", status: "Active" },
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
        setCategories(prev => prev.filter(category => category.id !== id));
        toast.info("Category deleted successfully!", {
            icon: "🗑️",
            style: { background: "#00c4cc", color: "white", fontWeight: "500" },
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
            style: { background: "#0d6efd", color: "white", fontWeight: "500" },
        });
    };

    const requestSort = (key) => {
        const direction = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    const filteredCategories = useMemo(() => {
        return categories.filter(({ category, title, status }) =>
            category.toLowerCase().includes(searchTerm) ||
            title.toLowerCase().includes(searchTerm) ||
            status.toLowerCase().includes(searchTerm)
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
    const displayedCategories = sortedCategories.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    return (
        <div style={{ background: "#f3f7fa", minHeight: "100vh" }}>

            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ background: "#fff", borderTop: "3px solid #03a9f4" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Model</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
                        <li className="breadcrumb-item active text-primary">Model</li>
                    </ol>
                </nav>
            </div>


            <div className="container p-4">
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
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        {["Category", "make", "Title", "Date", "Status", "Actions"].map(col => (
                                            <th key={col} onClick={col === "Actions" ? undefined : () => requestSort(col.toLowerCase())} style={{ cursor: col === "Actions" ? "default" : "pointer" }}>
                                                <div className="d-flex align-items-center">
                                                    {col}
                                                    {col !== "Actions" && <span className="ms-1">{getSortIcon(col.toLowerCase())}</span>}
                                                </div>
                                            </th>
                                        ))}


                                    </tr>
                                </thead>


                                <tbody>
                                    {displayedCategories.map(({ id, category, title, date, status, make }) => (
                                        <tr key={id}>
                                            <td>{category}</td>
                                            <td>{make}</td>
                                            <td>{title}</td>
                                            <td>{date}</td>
                                            <td>
                                                <div
                                                    onClick={() => handleToggleStatus(id)}
                                                    style={{
                                                        position: "relative",
                                                        width: "44px",
                                                        height: "24px",
                                                        borderRadius: "999px",
                                                        backgroundColor: status === "Active" ? "#00c4cc" : "#6c757d",
                                                        cursor: "pointer",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "2px",
                                                            left: status === "Active" ? "22px" : "2px",
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
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>🗑 Delete</button>
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
            </div>
        </div>
    );
}
