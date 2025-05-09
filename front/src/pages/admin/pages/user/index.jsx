import { useState, useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../../../../features/usersApi.js';

export default function Users() {
    const { data, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const users = data?.data || [];

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Search
    const [searchText, setSearchText] = useState('');

    // Sorting
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id).unwrap();
                alert("User deleted successfully.");
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete user.");
            }
        }
    };

    // Filter + sort users
    const filteredUsers = users
        .filter(user =>
            user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            if (!sortField) return 0;
            const aVal = a[sortField]?.toLowerCase?.() || a[sortField];
            const bVal = b[sortField]?.toLowerCase?.() || b[sortField];
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    // Paginate users
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>User Management</h5>
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
                                    value={rowsPerPage}
                                    onChange={e => {
                                        setRowsPerPage(parseInt(e.target.value));
                                        setCurrentPage(1);
                                    }}
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
                                    value={searchText}
                                    onChange={e => {
                                        setSearchText(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        <th style={{ cursor: "pointer" }} onClick={() => handleSort('_id')}>User ID</th>
                                        <th style={{ cursor: "pointer" }} onClick={() => handleSort('name')}>Name</th>
                                        <th style={{ cursor: "pointer" }} onClick={() => handleSort('email')}>Email</th>
                                        <th style={{ cursor: "pointer" }} onClick={() => handleSort('role')}>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => alert("Edit " + user._id)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
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

                        <div className="d-flex justify-content-between mt-3">
                            <span className="small text-muted">Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length} entries</span>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                            Previous
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </main>
    );
}
