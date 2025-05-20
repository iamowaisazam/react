import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../category/categoyFeature';
import { createModel, getAllMake } from './modelFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';


export default function AddModel() {
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

    useEffect(() => {
        getCategories()
            .then(res => {
                if (res.data.success) {
                    setCategories(res.data.data.data);
                } else {
                    toast.error("Failed to load categories.");
                }
            })
            .catch(err => {
                console.error("Failed to fetch categories:", err);
                toast.error("Error loading categories.");
            });

        getAllMake()
            .then(res => {
                if (res.data.success) {
                    setMakes(res.data.data.data);
                } else {
                    toast.error("Failed to load makes.");
                }
            })
            .catch(err => {
                console.error("Failed to fetch makes:", err);
                toast.error("Error loading makes.");
            });
    }, []);

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

        createModel(payload)
            .then(res => {
                if (res.data.success) {
                    toast.success("Model created successfully!");
                    setCatId('');
                    setMakeId('');
                    setName('');
                } else {
                    toast.error("Failed to create model.");
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
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Model</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Model</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Model</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <CategoryDropdown
                                        value={catId}
                                        error={state.errors.catId}
                                        setValue={(val) => setCatId(val)}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Make</label>
                                    <MakeDropDown
                                        value={makeId}
                                        error={state.errors.makeId}
                                        setValue={(val) => setMakeId(val)}
                                    />
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
                                    {state.loading ? 'Saving...' : 'Add Model'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
