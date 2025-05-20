import { useState } from 'react';
import { toast } from 'react-toastify';
import { createCategories } from './categoyFeature'; // Make sure this calls your backend API

export default function Addmenu() {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [formData, setFormData] = useState({
        name: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await createCategories(formData);

            if (res.data.success) {
                toast.success("Category created successfully!");
                setFormData({ name: '' });
                setState({ ...state, loading: false });
            } else {
                toast.error("Failed to create category!");
                setState({ ...state, loading: false });
            }

        } catch (error) {
            setState({
                ...state,
                errors: error.response?.data?.errors ?? {},
                loading: false,
            });
            toast.error("Validation failed. Please check the fields.");
            console.error("API Error:", error.response?.data);
        }
    };

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Category</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Category</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Category</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${state.errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Enter category name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    {state.errors.name && <div className="invalid-feedback">{state.errors.name}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Adding...' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
