import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMake } from '../../make/makeFeature';


export default function CategoryDropdown(props) {

    const { value, setValue, error } = props;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            setLoading(true);
            const res = await getMake();
            if (res.data.success) {
                setData(res.data.data.data);
                setLoading(false);
            } else {
                toast.error("Failed to load categories.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            toast.error("Error loading categories.");
            setLoading(false);
        }
    }


    return (<div>
        {loading ? 'Loading' :
            <select name="makeId"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`form-select ${error ? 'is-invalid' : ''}`}>

                <option value="99">Select Make</option>
                {data.map((make) => (
                    <option key={make._id} value={make._id}>
                        {make.name}
                    </option>
                ))}

            </select>
        }
        {error && <div className="invalid-feedback">{error}</div>}
    </div>);
}
