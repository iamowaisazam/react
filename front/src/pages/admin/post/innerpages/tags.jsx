import { useState } from 'react';

export default function Tags({ value = [], onChange }) {
    const [tagInputs, setTagInputs] = useState(value.length ? value : ['']);

    const handleTagChange = (index, newVal) => {
        const updated = [...tagInputs];
        updated[index] = newVal;
        setTagInputs(updated);
        onChange(updated.join(','));
    };

    const addNewTag = () => {
        setTagInputs((prev) => [...prev, '']);
    };

    const removeTag = (index) => {
        const updated = tagInputs.filter((_, i) => i !== index);
        setTagInputs(updated);
        onChange(updated.join(','));
    };

    return (
        <div className="col-md-8">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body" style={{ maxHeight: '1000px', overflowY: 'auto' }}>
                    <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                        Tags
                    </h5>

                    {tagInputs.map((tag, index) => (
                        <div className="mb-3 d-flex" key={index}>
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Enter tag"
                                value={tag}
                                onChange={(e) => handleTagChange(index, e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeTag(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="btn btn-sm btn-dark mt-2"
                        onClick={addNewTag}
                    >
                        + Add Tag
                    </button>
                </div>
            </div>
        </div>
    );
}
