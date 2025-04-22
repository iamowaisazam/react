import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, searchCar } from '../../../../../store/slices/productSlice';



export default function TopFilter() {

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const selectStyle = {
        backgroundColor: '#1f2937',
        color: 'white',
        border: '1px solid #374151',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
    };

    const iconBtnStyle = {
        backgroundColor: '#1f2937',
        border: '1px solid #374151',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    };


    const [filters, setFilters] = useState({
        brand: 'Infinity',
        model: 'Sedanx50',
        type: 'Door',
        color: 'Red',
        category: 'Sedan',
    });



    const colors = useSelector((state) => state.color.data);
    const data = useSelector((state) => state.product);

    return (
        <>

            <div className="row g-3 mb-5">
                {/* Category */}
                <div className="col-md-3 col-6">
                    <label className="text-white">Category</label>
                    <select
                        name="category"
                        value={data.filters.category}
                        onChange={(e) => dispatch(setFilter({ filter: 'category', value: e.target.value }))}
                        style={selectStyle}
                        className="form-select"
                    >
                        <option value="">Select Category</option>
                        <option value={1}>Bike</option>
                        <option value={2}>Car</option>
                        <option value={3}>Plane</option>
                        <option value={4}>Truck</option>
                    </select>
                </div>

                {/* Make */}
                <div className="col-md-3 col-6">
                    <label className="text-white">Make</label>
                    <select
                        name="brand"
                        value={data.filters.brand}
                        onChange={(e) => dispatch(setFilter({ filter: 'brand', value: e.target.value }))}
                        style={selectStyle}
                        className="form-select"
                    >
                        <option value="">Select Make</option>
                        <option value="honda">Honda</option>
                        <option value="suzuki">Suzuki</option>
                        <option value="toyota">Toyota</option>
                    </select>
                </div>

                {/* Year */}
                <div className="col-md-3 col-6">
                    <label className="text-white">Year</label>
                    <select
                        name="year"
                        value={data.filters.year}
                        onChange={(e) => dispatch(setFilter({ filter: 'year', value: e.target.value }))}
                        style={selectStyle}
                        className="form-select"
                    >
                        <option value="">Select Year</option>
                        <option value="1990">1990</option>
                        <option value="2000">2000</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
                <div className="col-md-3 col-6 d-flex align-items-end justify-content-end">
                    <button onClick={() => dispatch(searchCar())} style={iconBtnStyle}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>

                {/* Model */}
                <div className="col-md-3 col-6">
                    <label className="text-white">Model</label>
                    <select
                        name="model"
                        value={data.filters.model}
                        onChange={(e) => dispatch(setFilter({ filter: 'model', value: e.target.value }))}
                        style={selectStyle}
                        className="form-select"
                    >
                        <option value="">Select Model</option>
                        <option value={1}>Furtunar </option>
                        <option value={2} >Yaris</option>
                        <option value={3} >Corola</option>
                        <option value={4} >Aqua</option>
                    </select>
                </div>

                {/* Version */}
                <div className="col-md-3 col-6">
                    <label className="text-white">Version</label>
                    <select
                        name="version"
                        value={data.filters.version}
                        onChange={(e) => dispatch(setFilter({ filter: 'version', value: e.target.value }))}
                        style={selectStyle}
                        className="form-select"
                    >
                        <option value="">Select Version</option>
                        <option value={1}>Grandi</option>
                        <option value={2} >Altis</option>
                    </select>
                </div>

                <div className="col-md-3 col-6 mt-5">

                    <button
                        onClick={() =>
                            setFilters({
                                category: '',
                                brand: '',
                                year: '',
                                model: '',
                                version: ''
                            })
                        }
                        className="btn btn-outline-light"
                        style={{ height: '38px', padding: '0 16px' }}
                    >
                        Reset
                    </button>
                </div>




            </div>

        </>
    );
}

