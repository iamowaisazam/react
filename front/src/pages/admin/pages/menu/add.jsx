import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Addmenu() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState('active');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !slug.trim()) {
            setError('All fields are required');
            toast.error("Please fill all fields");
            return;
        }

        setError('');
        toast.success("Menu created!");
        console.log({ name, slug, status });
        setName('');
        setSlug('');
        setStatus('active');
    };

    return (
        <main>

            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Menu</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small">
                        <li className="breadcrumb-item"><a href="#" className="text-muted text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active text-primary" aria-current="page">Add Menu</li>
                    </ol>
                </nav>
            </div>


            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Menu</h4>

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Menu Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? 'is-invalid' : ''}`}
                                        placeholder="Enter menu name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <div className="form-text text-muted">e.g. "Top Navigation"</div>
                                    {error && !name && <div className="invalid-feedback">Menu name is required</div>}
                                </div>


                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Slug</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !slug ? 'is-invalid' : ''}`}
                                        placeholder="menu-slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                    <div className="form-text text-muted">e.g. "top-nav"</div>
                                    {error && !slug && <div className="invalid-feedback">Slug is required</div>}
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
                                <button type="submit" className="btn btn-dark px-4">Add Menu</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
