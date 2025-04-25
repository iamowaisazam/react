import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, searchCar } from '../../../../../store/slices/productSlice';
import { FaSearch } from 'react-icons/fa';


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

            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <label className="text-white mb-1">Category</label>
                    <select
                        name="category"
                        value={data.filters.category}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: 'category', value: e.target.value || '' }));
                            dispatch(searchCar());
                        }}
                        className="form-select"
                        style={selectStyle}
                    >
                        <option value="">Select Category</option>
                        <option value={1}>Bike</option>
                        <option value={2}>Car</option>
                        <option value={3}>Plane</option>
                        <option value={4}>Truck</option>
                    </select>

                </div>


                <div className="col-md-4">
                    <label className="text-white mb-1">Make</label>
                    <select
                        name="brand"
                        value={data.filters.brand}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: 'brand', value: e.target.value || '' }));
                            dispatch(searchCar());
                        }}
                        className="form-select"
                        style={selectStyle}
                    >
                        <option value="">Select Make</option>
                        <option value="honda">Honda</option>
                        <option value="suzuki">Suzuki</option>
                        <option value="toyota">Toyota</option>
                    </select>

                </div>

                <div className="col-md-4">
                    <label className="text-white mb-1">Year</label>
                    <select
                        name="year"
                        value={data.filters.year}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: 'year', value: e.target.value || '' }));
                            dispatch(searchCar());
                        }}
                        className="form-select"
                        style={selectStyle}
                    >
                        <option value="">Select Year</option>
                        <option value="1990">1990</option>
                        <option value="2000">2000</option>
                        <option value="2025">2025</option>
                    </select>
                </div>



                <div className="col-md-4">
                    <label className="text-white mb-1">Model</label>
                    <select
                        name="model"
                        value={data.filters.model}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: 'model', value: e.target.value || '' }));
                            dispatch(searchCar());
                        }}
                        className="form-select"
                        style={selectStyle}
                    >
                        <option value="">Select Model</option>
                        <option value={1}>Furtunar</option>
                        <option value={2}>Yaris</option>
                        <option value={3}>Corolla</option>
                        <option value={4}>Aqua</option>
                    </select>
                </div>



                <div className="col-md-4">
                    <label className="text-white mb-1">Version</label>
                    <select
                        name="version"
                        value={data.filters.version}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: 'version', value: e.target.value || '' }));
                            dispatch(searchCar());
                        }}
                        className="form-select"
                        style={selectStyle}
                    >
                        <option value="">Select Version</option>
                        <option value={1}>Grandi</option>
                        <option value={2}>Altis</option>
                    </select>
                </div>


                <div className="col-md-4 d-flex gap-2 align-items-end">
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
                        className="btn btn-outline-light w-50"
                    >
                        Reset
                    </button>
                    {/* <button
                        onClick={() => dispatch(searchCar())}
                        className="btn btn-danger w-100"
                    >
                        <FaSearch className="me-2" />
                        Search
                    </button> */}
                </div>
            </div>


        </>
    );
}

