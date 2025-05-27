import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchversions } from '../../../../../../store/slices/versionSlice';

const VersionDropdown = ({ name = 'verId', value, onChange, selectStyle }) => {
    const dispatch = useDispatch();
    const versions = useSelector((state) => state.versions.data);
    const loading = useSelector((state) => state.versions.loading);

    useEffect(() => {
        dispatch(fetchversions());
    }, [dispatch]);

    return (
        <div className="col-md-4">
            <label className="text-white mb-1">Version</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                style={selectStyle}
                disabled={loading}
            >
                <option value="">Select Version</option>
                {versions.map((version, i) => (
                    <option key={i} value={version._id}>
                        {version.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VersionDropdown;
