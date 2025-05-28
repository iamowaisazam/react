import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getModel } from '../../model/modelFeature';

export default function ModelDropDown(props) {
    const { value, setValue, error, disabled = false } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchModels();
    }, []);

    async function fetchModels() {
        try {
            setLoading(true);
            const res = await getModel();
            if (res.data.success) {
                setData(res.data.data.data);
            } else {
                toast.error("Failed to load models.");
            }
        } catch (err) {
            toast.error("Error loading models.");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const selectedId = e.target.value;
        const selectedModel = data.find(model => model._id === selectedId);
        setValue(selectedId);
        if (onModelSelect && selectedModel) {
            onModelSelect({
                makeId: selectedModel.makeId?._id,
                catId: selectedModel.catId?._id,
            });
        }
    };

    return (
        <div>
            {loading ? 'Loading...' :
                <select
                    name="modelId"
                    value={value}
                    onChange={handleChange}
                    className={`form-select ${error ? 'is-invalid' : ''}`}
                    disabled={disabled}
                >
                    <option value="">Select Model</option>
                    {data.map((model) => (
                        <option key={model._id} value={model._id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            }
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
