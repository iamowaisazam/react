

export default function Features({ features, onChange }) {

    const handleFeatureChange = (index, field, newVal) => {
        const updated = [...features];
        updated[index][field] = newVal;
        onChange(updated);
    };

    const addNewFeature = () => {
        let modifyfeatures = features;
        modifyfeatures.push({title:'',value:''});
        onChange(modifyfeatures);
    };

    const removeFeature = (index) => {
        const updated = features.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div className="col-md-8">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom" style={{ zIndex: 1 }}>
                        Features
                    </h5>

                    {features && features.map((feature, index) => (
                        <div className="mb-3 d-flex" key={index}>
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Key"
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Value"
                                value={feature.value}
                                onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeFeature(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <div className="text-center" >  
                        <button type="button"
                            className="btn btn-sm btn-dark mt-2"
                            onClick={addNewFeature}>
                            + Add Feature
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    );
}
