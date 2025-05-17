import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../category/categoyFeature';
import { getAllMake, getModelById, updateModel } from './modelFeature';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditModel() {
    const { id } = useParams(); // Get model ID from URL
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [categories, setCategories] = useState([]);
    const [makes, setMakes] = useState([]);

    const [catId, setCatId] = useState('');
    const [makeId, setMakeId] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState(false);

    // Fetch initial data
    useEffect(() => {
        getCategories()
            .then(res => res.data.success && setCategories(res.data.data.data))
            .catch(err => {
                console.error("Failed to fetch categories:", err);
                toast.error("Error loading categories.");
            });

        getAllMake()
            .then(res => res.data.success && setMakes(res.data.data.data))
            .catch(err => {
                console.error("Failed to fetch makes:", err);
                toast.error("Error loading makes.");
            });

        if (id) {
            getModelById(id)
                .then(res => {
                    if (res.data.success) {
                        const model = res.data.data;
                        setCatId(model.catId);
                        setMakeId(model.makeId);
                        setName(model.name);
                    } else {
                        toast.error("Failed to load model.");
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch model:", err);
                    toast.error("Error loading model.");
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setState({ ...state, loading: true });

        if (!catId || !makeId || !name) {
            setError(true);
            setState({ ...state, loading: false });
            toast.error("Please fill all required fields.");
            return;
        }

        const payload = {
            catId,
            makeId,
            name,
        };

        updateModel(id, payload)
            .then(res => {
                if (res.data.success) {
                    toast.success("Model updated successfully!");

                } else {
                    toast.error("Failed to update model.");
                }
            })
            .catch(error => {
                setState({
                    ...state,
                    errors: error.response?.data?.errors || {},
                });
                toast.error("Validation failed. Please check the fields.");
            })
            .finally(() => {
                setState(prev => ({ ...prev, loading: false }));
            });
    };

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Edit Model</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Edit Model</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Edit Model</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Selected Category</label>
                                    <select
                                        className={`form-select ${error && !catId ? 'is-invalid' : ''}`}
                                        value={catId}
                                        onChange={(e) => setCatId(e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Select Make</label>
                                    <select
                                        className={`form-select ${error && !makeId ? 'is-invalid' : ''}`}
                                        value={makeId}
                                        onChange={(e) => setMakeId(e.target.value)}
                                    >
                                        <option value="">Select Make</option>
                                        {makes.map((mk) => (
                                            <option key={mk._id} value={mk._id}>{mk.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? 'is-invalid' : ''}`}
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Updating...' : 'Update Model'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
