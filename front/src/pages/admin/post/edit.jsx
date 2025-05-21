import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSinglePost, editPost } from './postFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';
import ModelDropDown from '../components/dropdowns/modelDropdown';
import VersionsDropdown from '../components/dropdowns/versionDropdown'; // Make sure this is imported

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
        verId: '',
        title: '',
        slug: '',
    });

    useEffect(() => {
        if (id) {
            fetchVersion();
        } else {
            toast.error("Invalid Post ID");
            navigate('/admin/view-post');
        }
    }, [id]);

    const fetchVersion = async () => {
        try {
            const res = await getSinglePost(id);
            if (res.data.success) {
                const { catId, makeId, modelId, verId, title, slug } = res.data.data;
                setFormData({
                    catId: catId?._id || '',
                    makeId: makeId?._id || '',
                    modelId: modelId?._id || '',
                    verId: verId?._id || '',
                    title: title || '',
                    slug: slug || '',
                });
            } else {
                toast.error("Failed to fetch post details");
                navigate('/admin/view-post');
            }
        } catch (error) {
            toast.error("Error fetching post data");
            navigate('/admin/view-post');
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
            const res = await editPost(id, formData);
            if (res.data.success) {
                toast.success("Post updated successfully!");
                navigate('/admin/view-post');
            } else {
                toast.error("Failed to update post!");
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
        <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
                className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
                style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}
            >
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>
                    Edit Post
                </h5>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Update Version Details</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Left Section - Text Fields */}
                                <div className="col-md-8">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                                                Basic Information
                                            </h5>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter title"
                                                    value={formData.title}
                                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                                />
                                                {state.errors.title && <small className="text-danger">{state.errors.title}</small>}
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
                                                {state.errors.slug && <small className="text-danger">{state.errors.slug}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section - Dropdowns */}
                                <div className="col-md-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                                                Select Related Fields
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
                                                <label className="form-label fw-semibold">Version</label>
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

                            <div className="d-flex justify-content-end pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-primary px-4" disabled={state.loading}>
                                    {state.loading ? 'Updating...' : 'Update Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
