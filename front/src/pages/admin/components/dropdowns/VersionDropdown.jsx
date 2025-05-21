import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getVersions } from '../../version/versionFeature';


export default function VersionsDropdown(props) {

    const { value, setValue, error } = props;

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


    return (<div>
        {loading ? 'Loading' :
            <select name="verId"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`form-select ${error ? 'is-invalid' : ''}`}>

                <option value="99">Select Category</option>
                {data.map((Versions) => (
                    <option key={Versions._id} value={Versions._id}>
                        {Versions.name}
                    </option>
                ))}

            </select>
        }
        {error && <div className="invalid-feedback">{error}</div>}
    </div>);
}
