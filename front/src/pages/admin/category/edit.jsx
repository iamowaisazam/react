import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getSingleCategory, editCategory } from './categoyFeature';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
    });

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });


    useEffect(() => {
        setState(prev => ({ ...prev, loading: true }));
        getSingleCategory(id)
            .then((res) => {

                setFormData({
                    name: res.data.data.name,
                    slug: res.data.data.slug,
                });
                setState(prev => ({ ...prev, loading: false }));
            })
            .catch(() => {
                toast.error("Failed to fetch Category data.");
                setState(prev => ({ ...prev, loading: false }));
            });
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await editCategory(id, formData);

            if (res.success) {
                toast.success("Category updated successfully!");
                navigate('/admin/view-categories');
            } else {

                setState({
                    ...state,
                    errors: res.errors || {},
                    loading: false
                });
                toast.error("Failed to update Category!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setState({ ...state, loading: false });
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
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            const slug = name
                                                .toLowerCase()
                                                .replace(/[^a-z0-9\s-]/g, '')
                                                .trim()
                                                .replace(/\s+/g, '-')
                                                .replace(/-+/g, '-');

                                            setFormData({ ...formData, name, slug });
                                        }}
                                    />
                                    {state.errors.name && <div className="invalid-feedback">{state.errors.name}</div>}
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Slug</label>
                                    <input
                                        type="text"
                                        className={`form-control ${state.errors.slug ? 'is-invalid' : ''}`}
                                        placeholder="category-slug"
                                        value={formData.slug}
                                        readOnly
                                    />
                                    {state.errors.slug && <div className="invalid-feedback">{state.errors.slug}</div>}
                                </div>




                                {/* <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category Image</label>
                                    <input
                                        type="file"
                                        className={`form-control ${error && !image ? 'is-invalid' : ''}`}
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*"
                                    />
                                    <div className="form-text text-muted">Upload a category image</div>
                                    {error && !image && <div className="invalid-feedback">Image is required</div>}
                                </div> */}
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
