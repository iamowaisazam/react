import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMake } from '../../make/makeFeature';

export default function MakeDropDown(props) {
    const { value, setValue, setCatFromMake, error, disabled = false } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchMakes();
    }, []);

    async function fetchMakes() {
        try {
            setLoading(true);
            const res = await getMake();
            if (res.data.success) {
                setData(res.data.data.data);
            } else {
                toast.error("Failed to load makes.");
            }
        } catch (err) {
            toast.error("Error loading makes.");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const selectedId = e.target.value;
        setValue(selectedId);
        const selectedMake = data.find(make => make._id === selectedId);
        if (selectedMake && selectedMake.catId?._id) {
            setCatFromMake(selectedMake.catId._id);
        }
    };

    return (
        <div>
            {loading ? 'Loading...' :
                <select
                    name="makeId"
                    value={value}
                    onChange={handleChange}
                    className={`form-select ${error ? 'is-invalid' : ''}`}
                    disabled={disabled}
                >
                    <option value="">Select Make</option>
                    {data.map((make) => (
                        <option key={make._id} value={make._id}>
                            {make.name}
                        </option>
                    ))}
                </select>
            }
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
