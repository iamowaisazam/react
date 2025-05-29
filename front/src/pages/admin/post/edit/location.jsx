export default function Location({data, onChange }) {
    

    return (
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                    <h5 className="fw-bold mb-4" 
                    style={{ 
                        position: 'sticky', 
                        top: 0, 
                        backgroundColor: 'white', 
                        padding: '12px 20px', 
                        zIndex: 1, 
                        borderBottom: '2px solid #ddd' 
                        }}>Location</h5>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter country"
                            value={data?.country ?? ''}
                            onChange={(e) => onChange('country', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">State</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter state"
                            value={data?.state ?? ''}
                            onChange={(e) => onChange('state', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">City</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter city"
                            value={data?.city ?? ''}
                            onChange={(e) => onChange('city', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


