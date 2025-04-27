import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Viewcar() {

    const [selectedImages, setSelectedImages] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        setSelectedImages(fileArray);
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
            <div className="container mt-5 p-4" style={{ backgroundColor: 'rgba(162, 204, 253, 0.39)', borderRadius: "15px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <div className="row g-4">
                    {/* Left Section (70% Width) */}
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Basic Information
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input type="text" className="form-control" placeholder="Enter name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Slug</label>
                                    <input type="text" className="form-control" placeholder="Enter slug" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Price</label>
                                    <input type="text" className="form-control" placeholder="Enter price" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (30% Width) */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Fuel & Transmission
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Fuel Type</label>
                                    <select className="form-select">
                                        <option value="automatic">Automatic</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Doors</label>
                                    <select className="form-select">
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Transmission</label>
                                    <select className="form-select">
                                        <option value="automatic">Automatic</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Section (70% Width) */}
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Images
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Main Image</label>
                                    <input type="file" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Gallery Images</label>
                                    <div className="custom-file-input-wrapper">
                                        <input
                                            type="file"
                                            className="form-control custom-file-input"
                                            multiple
                                            id="galleryImages"
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="galleryImages" className="custom-file-label p-5">
                                            Select Files
                                        </label>
                                    </div>

                                    {/* Image Preview Section */}
                                    <div className="mt-3">
                                        {selectedImages.length > 0 && (
                                            <div className="image-previews">
                                                {selectedImages.map((image, index) => (
                                                    <div key={index} className="image-preview">
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt={`Preview ${index}`}
                                                            className="img-thumbnail"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <style jsx>
                                    {`
        .custom-file-input-wrapper {
            position: relative;
            display: inline-block;
            width: 100%;
        }

        .custom-file-input {
            display: none;
        }

        .custom-file-label {
            display: block;
            padding: 12px 20px;
            background-color: #f8f9fa;
            border: 1px solid #ced4da;
            border-radius: 5px;
            cursor: pointer;
            color: #495057;
            font-weight: 500;
            font-size: 1rem;
            text-align: center;
            position: relative;
        }

        .custom-file-label:after {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
        }

        .custom-file-input:focus + .custom-file-label,
        .custom-file-input:not(:placeholder-shown) + .custom-file-label {
            background-color: #e9ecef;
            border-color: #80bdff;
            color: #007bff;
        }

        .custom-file-input:valid + .custom-file-label {
            color: rgb(3, 169, 244);
        }

        .custom-file-input-label {
            width: 100%;
        }
    `}
                                </style>

                            </div>
                        </div>
                    </div>

                    {/* Right Section (30% Width) */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Location
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Country</label>
                                    <input type="text" className="form-control" placeholder="Enter country" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">City</label>
                                    <input type="text" className="form-control" placeholder="Enter city" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Area</label>
                                    <input type="text" className="form-control" placeholder="Enter area" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Section (70% Width) */}
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" >
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Specifications
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Category</label>
                                    <select className="form-select">
                                        <option value="">Select Category</option>
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Make</label>
                                    <select className="form-select">
                                        <option value="">Select Make</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Model</label>
                                    <select className="form-select">
                                        <option value="">Select Model</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Version</label>
                                    <select className="form-select">
                                        <option value="">Select Version</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Year</label>
                                    <select className="form-select">
                                        <option value="">Select Year</option>
                                        {Array.from({ length: 30 }, (_, i) => (
                                            <option key={i} value={2025 - i}>{2025 - i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (30% Width) */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                                <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                                    Additional Features
                                </h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="acFront" />
                                    <label className="form-check-label" htmlFor="acFront">A/C: Front</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="backupCamera" />
                                    <label className="form-check-label" htmlFor="backupCamera">Backup Camera</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="cruiseControl" />
                                    <label className="form-check-label" htmlFor="cruiseControl">Cruise Control</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="navigation" />
                                    <label className="form-check-label" htmlFor="navigation">Navigation</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between pt-3 border-top mt-3">
                    <button type="submit" className="btn btn-dark px-4 py-2 rounded-3">Add Car</button>
                </div>
            </div>









        </main>
    );
}

