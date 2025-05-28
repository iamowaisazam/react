import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getVersions } from '../../version/versionFeature';


export default function VersionsDropdown(props) {
    const { value, setValue, error, onVersionChange } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchVersions();
    }, []);

    async function fetchVersions() {
        try {
            setLoading(true);
            const res = await getVersions();
            if (res.data.success) {
                setData(res.data.data.data);
                setLoading(false);
            } else {
                toast.error("Failed to load Versions.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Failed to fetch Versions:", err);
            toast.error("Error loading Versions.");
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const selectedId = e.target.value;
        setValue(selectedId);

        const selectedVersion = data.find(v => v._id === selectedId);
        if (onVersionChange) {
            onVersionChange(selectedVersion);
        }
    };

    return (
        <div>
            {loading ? 'Loading' :
                <select
                    name="verId"
                    value={value}
                    onChange={handleChange}
                    className={`form-select ${error ? 'is-invalid' : ''}`}>
                    <option value="">Select Versions</option>
                    {data.map((version) => (
                        <option key={version._id} value={version._id}>
                            {version.name}
                        </option>
                    ))}
                </select>
            }
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

