import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Addmenu() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState('active');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !slug.trim() || !image) {
            setError('All fields are required');
            toast.error("Please fill all fields and upload an image");
            return;
        }

        setError('');
        toast.success("Menu created!");
        console.log({ name, slug, status, image });
        setName('');
        setSlug('');
        setStatus('active');
        setImage(null);
    };

    return (
        <main>

            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Make</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Make</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Make</h4>

                        <form onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category Name</label>
                                    <select
                                        className={`form-select ${error && !name ? 'is-invalid' : ''}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Car">Car</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Truck">Truck</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? 'is-invalid' : ''}`}
                                        placeholder="Enter Title"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />


                                </div>



                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Status</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <div className="form-text text-muted">Choose menu visibility</div>
                                </div>
                            </div>



                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4">Add Make</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
