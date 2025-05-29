import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSinglePost, editPost } from '../postFeature';
import useEditPost from './hook'; 



import CategoryDropdown from '../../components/dropdowns/CategoryDropdown';
import MakeDropDown from '../../components/dropdowns/makeDropdown';
import ModelDropDown from '../../components/dropdowns/modelDropdown';
import VersionsDropdown from '../../components/dropdowns/VersionDropdown';
import Tags from './tags'
import Location from './location'
import Features from './features'
import MapLocation from './maplocation'
import Description from './description'

export default function EditVersion() {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        fetchVersion,
        state,
        formData,
        handleInputChange,
        handleVersionChange,
        handleSubmit
      } = useEditPost(id);


    useEffect(() => {
    
        if (id) {
            fetchVersion();
        } else {
            toast.error("Invalid Post ID");
            navigate('/admin/view-post');
        }

    }, [id]);


    return (
        <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
                className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
                style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Edit Post</h5>
            </div>

            <div className="container mt-2 py-4" style={{ backgroundColor: 'rgba(162, 204, 253, 0.15)', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    {/* Left Section - Basic Information */}
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
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
                                    <p className='text-danger'>{state.errors?.slug}</p>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter price"
                                        value={formData.price || ''}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                    />
                                     <p className='text-danger'>{state.errors?.price}</p>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Status</label>
                                    <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} className='form-control'>
                                        <option value="0">Deactive</option>
                                        <option value="1">Active</option>
                                    </select>  
                                 </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                                            Mapping
                                        </h5>
    
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Category</label>
                                            <CategoryDropdown
                                                value={formData.catId}
                                                error={state.errors.catId}
                                                setValue={(val) => handleInputChange('catId', val)}
                                                disabled={true}
                                            />
                                        </div>
            
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Make</label>
                                            <MakeDropDown
                                                value={formData.makeId}
                                                error={state.errors.makeId}
                                                setValue={(val) => handleInputChange('makeId', val)}
                                                disabled={true}
                                            />
                                        </div>
    
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Model</label>
                                            <ModelDropDown
                                                value={formData.modelId}
                                                error={state.errors.modelId}
                                                setValue={(val) => handleInputChange('modelId', val)}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Versions</label>
                                            <VersionsDropdown
                                                value={formData.verId}
                                                error={state.errors.verId}
                                                setValue={(val) => handleInputChange('verId', val)}
                                                onVersionChange={handleVersionChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Tags value={formData.tags} 
                                onChange={(tags) => handleInputChange('tags', tags)} />
                            
                            <Location data={formData} onChange={handleInputChange} />
                            
                            <Features features={formData.features} 
                                onChange={(features) => handleInputChange('features', features)} />
                           
                            <MapLocation data={formData} onChange={handleInputChange}   />
                            
                            <Description value={formData.description} onChange={(des) => handleInputChange('description', des)} />

                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top mt-3">
                            <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                {state.loading ? 'Adding...' : 'Add Post'}
                            </button>
                        </div>
                    </form>
            </div>
        </main>
    );
}
