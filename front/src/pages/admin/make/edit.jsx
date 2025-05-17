import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleMake, editMake } from './makeFeature';
import CategoryDropdown from '../components/dropdowns/CategoryDropdown';

export default function EditMake() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        catId: '',
    });

    const [state, setState] = useState({
        loading: false,
        errors: {},
    });

    useEffect(() => {


        const fetchData = async () => {
        
            setState(prev => ({ ...prev, loading: true }));

            try {

                const makeRes = await getSingleMake(id);
                const makeData = makeRes.data.data;
                setFormData({
                    name: makeData.name,
                    catId: makeData.catId?._id || makeData.catId,
                });

            } catch (err) {
                toast.error("Failed to fetch data.");
            }

            setState(prev => ({ ...prev, loading: false }));
        };

        fetchData();
    }, [id]);


    const handleSubmit = async (e) => {

        e.preventDefault();
        setState({ ...state, loading: true, errors: {} });

        try {
            const res = await editMake(id, formData);

            if (res.success) {
                toast.success("Make updated successfully!");
                navigate('/admin/view-categories');
            } else {
                setState({
                    ...state,
                    errors: res.errors || {},
                    loading: false
                });
                toast.error("Failed to update Make!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setState({ ...state, loading: false });
        }
    };


    return (
        <main>
            <div className="container mt-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">Edit Make</h4>
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
                                        onChange={(e) => setFormData({ ...formData, name:e})}
                                    />
                                    {state.errors.name && (
                                        <div className="invalid-feedback">{state.errors.name}</div>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top mt-3">
                                <button type="submit" className="btn btn-dark px-4" disabled={state.loading}>
                                    {state.loading ? 'Updating...' : 'Update Make'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
