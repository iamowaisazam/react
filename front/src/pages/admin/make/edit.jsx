import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleMake, editMake } from './makeFeature';
import { getCategories } from '../category/categoyFeature';

export default function EditMake() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        catId: '',
    });

    const [categories, setCategories] = useState([]);
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });


    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    };

    useEffect(() => {
        const fetchData = async () => {
            setState(prev => ({ ...prev, loading: true }));

            try {
                const [makeRes, catRes] = await Promise.all([
                    getSingleMake(id),
                    getCategories()
                ]);

                const makeData = makeRes.data.data;

                setFormData({
                    name: makeData.name,
                    slug: makeData.slug,
                    catId: makeData.catId?._id || makeData.catId,
                });

                setCategories(catRes.data.data.data);
            } catch (err) {
                toast.error("Failed to fetch data.");
            }

            setState(prev => ({ ...prev, loading: false }));
        };

        fetchData();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                name: value,
                slug: generateSlug(value),
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await editMake(id, formData);

            if (res.success) {
                toast.success("Make updated successfully!");
                navigate('/admin/view-categories');
            } else {
                setState({
                    ...state,
                    errors: res.errors || {},
                    loading: false
                });
                toast.error("Failed to update Make!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setState({ ...state, loading: false });
        }
    };

    return (
        <main>
            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Edit Make</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {/* Category */}
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <select
                                        name="catId"
                                        className={`form-select ${state.errors.catId ? 'is-invalid' : ''}`}
                                        value={formData.catId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {state.errors.catId && (
                                        <div className="invalid-feedback">{state.errors.catId}</div>
                                    )}
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
                                    {state.errors.name && (
                                        <div className="invalid-feedback">{state.errors.name}</div>
                                    )}
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
                                    {state.loading ? 'Updating...' : 'Update Make'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
