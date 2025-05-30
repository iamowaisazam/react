import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useEditPost from '../hook'; 



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
        loading,
        errors,
        form,
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
                                    General Information
                                </h5>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label fw-semibold">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter title"
                                            value={form.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                        />
                                        <p className='text-danger' >{errors?.title}</p>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label fw-semibold">Slug</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter slug"
                                            value={form.slug}
                                            onChange={(e) => handleInputChange('slug', e.target.value)}
                                        />
                                        <p className='text-danger'>{errors?.slug}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter price"
                                            value={form.price || ''}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                        />
                                        <p className='text-danger'>{errors?.price}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Status</label>
                                        <select value={form.status} onChange={(e) => handleInputChange('status', e.target.value)} className='form-control'>
                                            <option value="0">Deactive</option>
                                            <option value="1">Active</option>
                                        </select>  
                                    </div>
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
                                                value={form.catId}
                                                error={errors.catId}
                                                setValue={(val) => handleInputChange('catId', val)}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Make</label>
                                            <MakeDropDown
                                                value={form.makeId}
                                                error={errors.makeId}
                                                setValue={(val) => handleInputChange('makeId', val)}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Model</label>
                                            <ModelDropDown
                                                value={form.modelId}
                                                error={errors.modelId}
                                                setValue={(val) => handleInputChange('modelId', val)}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Versions</label>
                                            <VersionsDropdown
                                                value={form.verId}
                                                error={errors.verId}
                                                setValue={(val) => handleInputChange('verId', val)}
                                                onVersionChange={handleVersionChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Tags value={form.tags} 
                                onChange={(tags) => handleInputChange('tags', tags)} />
                            
                            <Location data={form} onChange={handleInputChange} />
                            
                            <Features features={form.features} 
                                onChange={(features) => handleInputChange('features', features)} />
                           
                            <MapLocation data={form} onChange={handleInputChange}   />
                            
                            <Description value={form.description} onChange={(des) => handleInputChange('description', des)} />

                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-dark px-4" disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
            </div>
        </main>
    );
}
