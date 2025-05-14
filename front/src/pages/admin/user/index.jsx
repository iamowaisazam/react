import { useState, useEffect } from 'react';
import { getUsers, deleteUser, getSingleUser } from './userFeature';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function Users() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        search: '',
        page: 1,
        loading: true,
        total: 100,
        limit: 10,
    });



    useEffect(() => {

        getRecords(state)

    }, []);



    const handleOption = (name, value) => {
        const newState = { ...state, [name]: value };
        setState(newState);
        getRecords(newState);
    }

    const getRecords = async (options) => {
        setState({ ...state, loading: true });
        getUsers(options)
            .then((res) => {

                setData(res.data.data.data);
                setState({ ...state, loading: false });
            })
            .catch((error) => {
                console.error(error);
                setData([]);
                setState({ ...state, loading: false });
            });
    };




    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                toast.success("User deleted successfully!");
                getRecords(state);
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete user.");
            }
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
                                <label className="me-2 mb-0">Show </label>
                                <select onChange={(e) => { handleOption('limit', e.target.value) }}
                                    className="form-select form-select-sm"
                                    style={{ width: "80px" }}>
                                    <option>10</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option>500</option>
                                    <option value="">All</option>
                                </select>
                                <label className="ms-2 mb-0">entries</label>
                            </div>

                            <div className="d-flex align-items-center">
                                <label className="me-2 mb-0">Search: </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: "200px" }}
                                    onChange={(e) => { handleOption('search', e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        <th style={{ cursor: "pointer" }}>User ID</th>
                                        <th style={{ cursor: "pointer" }}>Name</th>
                                        <th style={{ cursor: "pointer" }}>Email</th>
                                        <th style={{ cursor: "pointer" }}>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        state.loading ? (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">
                                                    <div className="loading-spinner"></div>
                                                    <div className="loading-text">Please wait...</div>
                                                </td>
                                            </tr>

                                        ) :



                                            data.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user._id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => navigate(`/admin/edit-user/${user._id}`)}
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
                                            ))

                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <span className="small text-muted">Showing 1 to 2 of {state.total} entries</span>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item `}>
                                        <button className="page-link" onClick={() => null}>
                                            Previous
                                        </button>
                                    </li>
                                    <li className={`page-item ${state.page == 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setState({ ...state, page: 1 })}>
                                            1
                                        </button>
                                    </li>
                                    <li className={`page-item ${state.page == 2 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setState({ ...state, page: 2 })}>
                                            2
                                        </button>
                                    </li>
                                    <li className={`page-item`}>
                                        <button className="page-link" onClick={() => null}>
                                            Next</button>
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
