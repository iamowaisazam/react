

export default function Description({ value = '', onChange }) {
    

    return (
        <div className="col-md-8">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h5 className="fw-bold mb-4 sticky-top bg-white py-3 px-2 border-bottom"
                        style={{ zIndex: 1 }}>
                        Description
                    </h5>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                            className="form-control"
                            rows="6"
                            placeholder="Write a detailed description here..."
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
