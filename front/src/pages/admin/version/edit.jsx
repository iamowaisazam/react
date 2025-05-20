import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleVersions, editVersions } from './versionFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';
import ModelDropDown from '../components/dropdowns/modelDropdown';

export default function EditVersion() {
    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (id) {
            fetchVersion();
        } else {
            toast.error("Invalid version ID");
            navigate('/admin/view-version');
        }
    }, [id]);

    const fetchVersion = async () => {
        try {
            const res = await getSingleVersions(id);
            if (res.data.success) {
                const { catId, makeId, modelId, name } = res.data.data;
                setFormData({
                    catId: catId?._id || '',
                    makeId: makeId?._id || '',
                    modelId: modelId?._id || '',
                    name,
                });
            } else {
                toast.error("Failed to fetch version details");
                navigate('/admin/view-version');
            }
        } catch (error) {
            toast.error("Error fetching version data");
            navigate('/admin/view-version');
        }
    };

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
            const res = await editVersions(id, formData);
            if (res.data.success) {
                toast.success("Version updated successfully!");
                navigate('/admin/view-version');
            } else {
                toast.error("Failed to update version!");
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
                    Edit Versions
                </h5>
            </div>
            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Edit Version</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <CategoryDropdown
                                        value={formData.catId}
                                        error={state.errors.catId}
                                        setValue={(val) => handleInputChange('catId', val)}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Make</label>
                                    <MakeDropDown
                                        value={formData.makeId}
                                        error={state.errors.makeId}
                                        setValue={(val) => handleInputChange('makeId', val)}
                                    />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Model</label>
                                    <ModelDropDown
                                        value={formData.modelId}
                                        error={state.errors.modelId}
                                        setValue={(val) => handleInputChange('modelId', val)}
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
                                    {state.loading ? 'Updating...' : 'Update Version'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
