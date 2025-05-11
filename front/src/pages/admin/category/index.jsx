import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../../features/categoryApi.js';

export default function CategoryMenu() {
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const categories = data?.data || [];

    const [sortConfig, setSortConfig] = useState(null);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedCategories = useMemo(() => {
        if (!sortConfig) return categories;
        const sorted = [...categories].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    }, [categories, sortConfig]);

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
        toast.success("Status updated!", {
            icon: "🔄",
            style: {
                background: "#0d6efd",
                color: "white",
                fontWeight: "500",
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading categories.</p>;

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
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <button onClick={() => handleSort('id')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                ID {sortConfig?.key === 'id' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                            </button>
                                        </th>
                                        <th>
                                            <button onClick={() => handleSort('name')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                            </button>
                                        </th>
                                        <th>Slug</th>
                                        <th>
                                            <button onClick={() => handleSort('status')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                Status {sortConfig?.key === 'status' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                            </button>
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCategories.map(category => (
                                        <tr key={category._id}>
                                            <td>{category._id}</td>
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
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category._id)}>🗑 Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </main>
    );
}
