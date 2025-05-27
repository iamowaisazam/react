import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModels } from '../../../../../../store/slices/modelSlice';

const ModelDropdown = ({ name = 'modelId', value, onChange, selectStyle }) => {
    const dispatch = useDispatch();
    const models = useSelector((state) => state.models.data);
    const loading = useSelector((state) => state.models.loading);

    useEffect(() => {
        dispatch(fetchModels());
    }, [dispatch]);

    return (
        <div className="col-md-4">
            <label className="text-white mb-1">Model</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                style={selectStyle}
                disabled={loading}
            >
                <option value="">Select Model</option>
                {models.map((model, i) => (
                    <option key={i} value={model._id}>
                        {model.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelDropdown;
