import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcategories } from '../../../../../../store/slices/categorySlice';

const CategoryDropdown = ({ name, value, onChange, selectStyle }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const loading = useSelector((state) => state.categories.loading);

    useEffect(() => {
        dispatch(fetchcategories());
    }, [dispatch]);

    return (
        <div className="col-md-4">
            <label className="text-white mb-1">Category</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                style={selectStyle}
                disabled={loading}
            >
                <option value="">Select Category</option>
                {categories.map((category, i) => (
                    <option key={i} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};


export default CategoryDropdown;
