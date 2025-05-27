import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, fetchPosts } from '../../../../../store/slices/postSlice';
import { FaSearch } from 'react-icons/fa';
import MakeDropdown from './dropdown/make';
import CategoryDropdown from './dropdown/categories';
import ModelDropdown from './dropdown/model';
import VersionDropdown from './dropdown/version';

export default function TopFilter() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.product.filters);

    const selectStyle = {
        backgroundColor: '#1f2937',
        color: 'white',
        border: '1px solid #374151',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        marginBottom: '15px'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilter({ filter: name, value }));
        dispatch(fetchPosts());
    };

    return (
        <div className="row g-3 mb-4">
            <CategoryDropdown name="catId" value={filters.catId} onChange={handleChange} selectStyle={selectStyle} />
            <MakeDropdown name="makeId" value={filters.makeId} onChange={handleChange} selectStyle={selectStyle} />
            <ModelDropdown name="modelId" value={filters.modelId} onChange={handleChange} selectStyle={selectStyle} />
            <VersionDropdown name="verId" value={filters.verId} onChange={handleChange} selectStyle={selectStyle} />

            <div className="col-md-4">
                <label className="text-white mb-1">Year</label>
                <select
                    name="year"
                    value={filters.year}
                    onChange={handleChange}
                    className="form-select"
                    style={selectStyle}
                >
                    <option value="">Select Year</option>
                    <option value="1990">1990</option>
                    <option value="2000">2000</option>
                    <option value="2025">2025</option>
                </select>
            </div>

            <div className="col-md-2 mt-5">
                <button
                    onClick={() => {
                        ['catId', 'makeId', 'modelId', 'verId', 'year'].forEach((key) =>
                            dispatch(setFilter({ filter: key, value: '' }))
                        );
                        dispatch(fetchPosts());
                    }}
                    className="btn btn-outline-light w-100"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
