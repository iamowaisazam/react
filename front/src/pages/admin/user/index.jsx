import { useGetUsersQuery, useDeleteUserMutation } from '../../../features/usersApi.js';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const { data, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const users = data?.data || [];

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

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`);
    };

    if (isLoading) return <p className="p-4">Loading users...</p>;

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>User Management</h5>
            </div>

            <main className="flex-grow-1 p-4" style={{ background: "#f3f7fa", minHeight: "100vh" }}>
                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEdit(user._id)}
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
                    </div>
                </div>
            </main>
        </main>
    );
}
