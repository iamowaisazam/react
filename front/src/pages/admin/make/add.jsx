import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createMake } from './makeFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';



export default function Addmake() {

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    const [formData, setFormData] = useState({
        catId: '',
        name: '',
    });


    useEffect(() => {

       
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await createMake(formData);
            if (res.data.success) {
                toast.success("Make created successfully!");
                setFormData({
                    catId: '',
                    name: '',
                });
            } else {
                toast.error("Failed to create make!");
            }
        } catch (error) {
            setState({
                ...state,
                errors: error.response?.data?.errors || {},
            });
            toast.error("Validation failed. Please check the fields.");
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <main>


            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Create New Make</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <CategoryDropdown 
                                    value={formData.catId}
                                    error ={state.errors.catId} 
                                    setValue = {(e) => setFormData({ ...formData, catId:e})} />
                                </div>

                                {/* Title */}
                                <div className="col-md-6 mb-4">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${state.errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Enter Title"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData,name: e.target.value })}
                                    />
                                    {state.errors.name && <div className="invalid-feedback">{state.errors.name}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Adding...' : 'Add Make'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
