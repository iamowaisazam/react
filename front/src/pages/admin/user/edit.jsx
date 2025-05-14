import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getSingleUser, editUser } from './userFeature';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
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
                navigate('/admin/users')
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
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        {state.errors?.name && <small className="text-danger">{state.errors.name}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        {state.errors?.email && <small className="text-danger">{state.errors.email}</small>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        {state.errors?.password && <small className="text-danger">{state.errors.password}</small>}
                    </div>

                    <div className="d-flex ">
                        <button
                            type="submit"
                            className="btn btn-success w-10 me-2"
                            disabled={state.loading}
                        >
                            {state.loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            type="reset"
                            className="btn btn-secondary w-10"
                            onClick={() => {
                                setFormData({ name: '', email: '', password: '' });
                                setState(prev => ({ ...prev, errors: {} }));
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
