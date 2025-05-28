import { useState } from 'react';
import { toast } from 'react-toastify';
import { createVersions } from './versionFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';
import ModelDropDown from '../components/dropdowns/modelDropdown';

export default function AddVersion() {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [formData, setFormData] = useState({
        catId: '',
        makeId: '',
        modelId: '',
        name: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleModelSelect = ({ makeId, catId }) => {
        setFormData((prev) => ({
            ...prev,
            makeId,
            catId,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ loading: true, errors: {} });

        try {
            const res = await createVersions(formData);
            if (res.data.success) {
                toast.success("Version created successfully!");
                setFormData({
                    catId: '',
                    makeId: '',
                    modelId: '',
                    name: '',
                });
            } else {
                toast.error("Failed to create version!");
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
            <div
                className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
                style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}
            >
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>
                    Add Versions
                </h5>
            </div>
            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Versions</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <CategoryDropdown
                                        value={formData.catId}
                                        error={state.errors.catId}
                                        setValue={(val) => handleInputChange('catId', val)}
                                        disabled={true}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Make</label>
                                    <MakeDropDown
                                        value={formData.makeId}
                                        error={state.errors.makeId}
                                        setValue={(val) => handleInputChange('makeId', val)}
                                        setCatFromMake={(val) => handleInputChange('catId', val)}
                                        disabled={true}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Model</label>
                                    <ModelDropDown
                                        value={formData.modelId}
                                        error={state.errors.modelId}
                                        setValue={(val) => handleInputChange('modelId', val)}
                                        onModelSelect={handleModelSelect}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${state.errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Enter Title"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                    {state.errors.name && <div className="invalid-feedback">{state.errors.name}</div>}
                                </div>

                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Adding...' : 'Add Version'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
