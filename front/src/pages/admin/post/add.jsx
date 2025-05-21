import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPost } from './postFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';
import ModelDropDown from '../components/dropdowns/modelDropdown';
import VersionsDropdown from '../components/dropdowns/VersionDropdown';
export default function Addcar() {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [formData, setFormData] = useState({
        catId: '',
        makeId: '',
        modelId: '',
        title: '',
        slug: '',
        verId: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ loading: true, errors: {} });

        try {
            const res = await createPost(formData);
            if (res.data.success) {
                toast.success("Make created successfully!");
                setFormData({
                    catId: '',
                    makeId: '',
                    modelId: '',
                    name: '',
                });
            } else {
                toast.error("Failed to create make!");
            }
        } catch (error) {
            setState({
                loading: false,
                errors: error.response?.data?.errors || {},
            });
            toast.error("Validation failed. Please check the fields.");
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Add Product</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-muted text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Car</li>
                    </ol>
                </nav>
            </div>
            <div className="container mt-5 p-4" style={{ backgroundColor: 'rgba(162, 204, 253, 0.15)', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        {/* Left Section - Basic Information */}
                        <div className="col-md-8">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                                        Basic Information
                                    </h5>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Slug</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter slug"
                                            value={formData.slug}
                                            onChange={(e) => handleInputChange('slug', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Dropdowns */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                                        Fuel & Transmission
                                    </h5>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Category</label>
                                        <CategoryDropdown
                                            value={formData.catId}
                                            error={state.errors.catId}
                                            setValue={(val) => handleInputChange('catId', val)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Make</label>
                                        <MakeDropDown
                                            value={formData.makeId}
                                            error={state.errors.makeId}
                                            setValue={(val) => handleInputChange('makeId', val)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Model</label>
                                        <ModelDropDown
                                            value={formData.modelId}
                                            error={state.errors.modelId}
                                            setValue={(val) => handleInputChange('modelId', val)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Versions</label>
                                        <VersionsDropdown
                                            value={formData.verId}
                                            error={state.errors.verId}
                                            setValue={(val) => handleInputChange('verId', val)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="d-flex justify-content-between pt-3 border-top mt-3">
                        <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                            {state.loading ? 'Adding...' : 'Add Car'}
                        </button>
                    </div>
                </form>
            </div>










        </main>
    );
}

