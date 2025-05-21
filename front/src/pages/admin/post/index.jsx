import { useState, useEffect } from 'react';
import { getPost, deletePost } from './postFeature';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Model() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        search: '',
        page: 1,
        pages: 0,
        loading: true,
        total: 0,
        skip: 0,
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
        getPost(options)
            .then((res) => {

                res = res.data.data;
                console.log(res.data)
                setData(res.data);
                setState({
                    ...state,
                    loading: false,
                    page: res.page,
                    pages: res.pages,
                    total: res.total,
                    skip: res.skip
                });
            })
            .catch((error) => {
                console.error(error);
                setData([]);
                setState({ ...state, loading: false });
            });
    };



    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this Post?")) {
            try {
                await deletePost(id);
                toast.success("Post deleted successfully!");
                getRecords(state);
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete Post.");
            }
        }
    };


    return (
        <main style={{ width: '1200px', margin: '0 auto' }}>

            <div
                className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
                style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}
            >
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>
                    Post
                </h5>

                <Link to="/admin/add-post" className="admin_add_btn">
                    <FaUserPlus style={{ marginRight: "8px" }} />
                    Add Post
                </Link>
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

                        <div className="table-responsive" style={{ overflowX: 'auto', width: '95%' }}>

                            <table className="table table-hover align-middle mb-0 custom-table">
                                <thead className="table-light text-uppercase text-secondary small">
                                    <tr>
                                        <th style={{ cursor: "pointer" }}>#</th>
                                        <th style={{ cursor: "pointer" }}>Title</th>
                                        <th style={{ cursor: "pointer" }}>Slug</th>
                                        <th style={{ cursor: "pointer" }}>Category</th>
                                        <th style={{ cursor: "pointer" }}>Make</th>
                                        <th style={{ cursor: "pointer" }}>Model</th>
                                        <th style={{ cursor: "pointer" }}>Version</th>
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



                                            data.map((retunData, index) => (
                                                <tr key={retunData._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{retunData.title}</td>
                                                    <td>{retunData.slug}</td>
                                                    <td>{retunData.catId || 'N/A'}</td>
                                                    <td>{retunData.makeId || 'N/A'}</td>
                                                    <td>{retunData.modelId || 'N/A'}</td>
                                                    <td>{retunData.verId || 'N/A'}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => navigate(`/admin/edit-post/${retunData._id}`)}
                                                            >
                                                                ✎ Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDelete(retunData._id)}
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
                            <span className="small text-muted">Showing {state.skip + 1} to {Math.min(state.skip + data.length, state.total)} of {state.total} entries</span>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    {Array.from({ length: state.pages }, (_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${state.page === index + 1 ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handleOption('page', index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                            </nav>
                        </div>
                    </div>
                </div>
            </main>

        </main>
    );

}
