import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../category/categoyFeature';
import { createMake } from './makeFeature';

export default function Addmake() {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        slug: '',
        status: 'active',
    });


    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await getCategories();

                if (res.data.success) {
                    setCategories(res.data.data.data);
                } else {
                    toast.error("Failed to load categories.");
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                toast.error("Error loading categories.");
            }
        }

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setFormData({ ...formData, name: value, slug: generatedSlug });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await createMake(formData);

            if (res.data.success) {
                toast.success("Make created successfully!");
                setFormData({
                    category: '',
                    name: '',
                    slug: '',
                    status: 'active',
                });
            } else {
                toast.error("Failed to create make!");
            }
        } catch (error) {
            setState({
                ...state,
                errors: error.response?.data?.errors || {},
            });
            toast.error("Validation failed. Please check the fields.");
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <main>


            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Make</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <select
                                        name="catId"
                                        className={`form-select ${state.errors.category ? 'is-invalid' : ''}`}
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {state.errors.category && <div className="invalid-feedback">{state.errors.category}</div>}
                                </div>

                                {/* Title */}
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${state.errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Enter Title"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {state.errors.name && <div className="invalid-feedback">{state.errors.name}</div>}
                                </div>

                                {/* Slug */}
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        className="form-control"
                                        value={formData.slug}
                                        readOnly
                                    />
                                </div>


                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Adding...' : 'Add Make'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
