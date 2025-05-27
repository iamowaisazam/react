import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMakes } from '../../../../../../store/slices/makeSlice';

const MakeDropdown = ({ name = 'makeId', value, onChange, selectStyle }) => {
    const dispatch = useDispatch();
    const makes = useSelector((state) => state.makes.data);
    const loading = useSelector((state) => state.makes.loading);

    useEffect(() => {
        dispatch(fetchMakes());
    }, [dispatch]);

    return (
        <div className="col-md-4">
            <label className="text-white mb-1">Make</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                style={selectStyle}
                disabled={loading}
            >
                <option value="">Select Make</option>
                {makes.map((make, i) => (
                    <option key={i} value={make._id}>
                        {make.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MakeDropdown;
