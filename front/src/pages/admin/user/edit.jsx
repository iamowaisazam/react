import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleUser, editUser } from './userFeature';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    useEffect(() => {
        setState(prev => ({ ...prev, loading: true }));
        getSingleUser(id)
            .then((res) => {
                setFormData({
                    name: res.data.data.name,
                    email: res.data.data.email,
                    password: '',
                    role: res.data.data.role || '',
                });
                setState(prev => ({ ...prev, loading: false }));
            })
            .catch(() => {
                toast.error("Failed to fetch user data.");
                setState(prev => ({ ...prev, loading: false }));
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await editUser(id, formData);
            if (res.success) {
                toast.success("User updated successfully!");
                navigate('/admin/users');
            } else {
                const formattedErrors = {};
                if (Array.isArray(res.errors)) {
                    res.errors.forEach(err => {
                        formattedErrors[err.field] = err.message;
                    });
                }
                setState({ ...state, errors: formattedErrors, loading: false });
                toast.error("Failed to update user!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setState({ ...state, loading: false });
        }
    };

    return (
        <main className="container mt-5">
            <div className="card shadow-sm p-4">
                <h4 className="fw-bold mb-4">Edit User</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {state.errors?.name && <small className="text-danger">{state.errors.name}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {state.errors?.email && <small className="text-danger">{state.errors.email}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Role</label>
                        <select
                            className="form-control"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>

                        </select>
                        {state.errors?.role && <small className="text-danger">{state.errors.role}</small>}
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password (optional)"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {state.errors?.password && <small className="text-danger">{state.errors.password}</small>}
                    </div>


                    <div className="d-flex">
                        <button
                            type="submit"
                            className="btn btn-success w-10 me-2"
                            disabled={state.loading}
                        >
                            {state.loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <Link to="/admin/users" className="btn btn-secondary w-10">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
