import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function CategoryMenu() {
    const [categories, setCategories] = useState([
        { id: 1, title: "Car", slug: "car", price: "30000", category: "Vehicle", make: "Toyota", model: "Corolla", version: "2021", status: "Active" },
        { id: 2, title: "Bike", slug: "bike", price: "1000", category: "Vehicle", make: "Honda", model: "CBR", version: "2020", status: "Inactive" },
        { id: 3, title: "Truck", slug: "truck", price: "50000", category: "Vehicle", make: "Ford", model: "F-150", version: "2019", status: "Active" },
        { id: 4, title: "Bus", slug: "bus", price: "70000", category: "Transport", make: "Mercedes", model: "Sprinter", version: "2022", status: "Active" },
    ]);

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Pagination logic
    const totalPages = Math.ceil(categories.length / entriesPerPage);

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            return (
                category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.version.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [searchTerm, categories]);

    const displayedCategories = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredCategories.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredCategories, currentPage, entriesPerPage]);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
    };

    // Sort handling (optional, can be expanded)
    const requestSort = (key) => {
        const sorted = [...filteredCategories].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setCategories(sorted);
    };

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

                        <div className="card border-0 shadow-sm p-3 mb-4" style={{ background: "#fdfdfd", borderRadius: "12px" }}>
                            <div className="row g-3 align-items-end">

                                {/* Title */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Title</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm rounded-3"
                                        placeholder="Search Title"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>

                                {/* Price */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Price</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm rounded-3"
                                        placeholder="Enter Price"
                                    />
                                </div>

                                {/* Category */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Category</label>
                                    <select className="form-select form-select-sm rounded-3">
                                        <option value="">All Categories</option>
                                        <option value="vehicle">Vehicle</option>
                                        <option value="transport">Transport</option>
                                    </select>
                                </div>

                                {/* Make */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Make</label>
                                    <select className="form-select form-select-sm rounded-3">
                                        <option value="">All Makes</option>
                                        <option value="toyota">Toyota</option>
                                        <option value="honda">Honda</option>
                                        <option value="ford">Ford</option>
                                    </select>
                                </div>

                                {/* Model */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Model</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm rounded-3"
                                        placeholder="Enter Model"
                                    />
                                </div>

                                {/* Version */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Version</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm rounded-3"
                                        placeholder="Enter Version"
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <label className="form-label fw-semibold small text-muted">Status</label>
                                    <select className="form-select form-select-sm rounded-3">
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Search Button */}
                                <div className="col-lg-2 col-md-4 col-sm-6 d-grid">
                                    <button className="btn btn-sm btn-outline-primary rounded-1 fw-semibold p-1 " >
                                        Search
                                    </button>
                                </div>

                            </div>
                        </div>


                        {/* Table */}
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        {["ID", "Title", "Slug", "Price", "Category", "Make", "Model", "Version", "Status"].map(col => (
                                            <th key={col} style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {col}
                                                </div>
                                            </th>
                                        ))}
                                        <th style={{ whiteSpace: "nowrap" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Static row example */}
                                    <tr className="table-row-custom">
                                        <td>1</td>
                                        <td>Example Title</td>
                                        <td>example-slug</td>
                                        <td>$100</td>
                                        <td>Electronics</td>
                                        <td>Apple</td>
                                        <td>iPhone</td>
                                        <td>13 Pro</td>
                                        <td>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "44px",
                                                    height: "24px",
                                                    borderRadius: "999px",
                                                    backgroundColor: "#00c4cc",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "2px",
                                                        left: "22px",
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#f1f1f1",
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-primary">✎ Edit</button>
                                                <button className="btn btn-sm btn-outline-danger">🗑 Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="row align-items-center mt-3">
                            <div className="col-md-6 small text-muted">
                                Showing 1 to 10 of 50 entries
                            </div>
                            <div className="col-md-6">
                                <nav className="float-md-end">
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className="page-item disabled">
                                            <button className="page-link">Previous</button>
                                        </li>
                                        <li className="page-item active">
                                            <button className="page-link">1</button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link">2</button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </main >
    );
}
