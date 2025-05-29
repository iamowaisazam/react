import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPost } from './postFeature';
import { useNavigate } from 'react-router-dom';

import CategoryDropdown from '../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../components/dropdowns/makeDropdown';
import ModelDropDown from '../components/dropdowns/modelDropdown';
import VersionsDropdown from '../components/dropdowns/VersionDropdown';
import Tags from './edit/tags'
import Location from './edit/location'
import Features from './edit/features'
import MapLocation from './edit/maplocation'
import Description from './edit/description'

export default function Addpost() {

    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
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
                toast.success("Post created successfully!");
                navigate('/admin/view-post');
                
            } else {
                toast.error("Failed to create Post!");
            }
        } catch (error) {
            setState({
                loading: false,
                errors: error.response?.data?.errors || {},
            });
            toast.error("Validation failed. Please check the fields.");
        } finally {
            // setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <main>
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Add Post</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-muted text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Post</li>
                    </ol>
                </nav>
            </div>
            <div className="container-fluid mt-3" style={{ backgroundColor: 'rgba(162, 204, 253, 0.15)', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row ">
                        
                        <div className="col-md-12">
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
                                        <p className='text-danger' >{state.errors?.title}</p>
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
                                        <p className='text-danger' >{state.errors?.slug}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center my-3 pb-3">
                        <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                            {state.loading ? 'Loading..' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

