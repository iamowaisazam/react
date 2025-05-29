import { useState } from 'react';

export default function MapLocation({ value = {}, onChange }) {
    const handleChange = (field, val) => {
        onChange({
            ...value,
            [field]: val,
        });
    };

    return (
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body" style={{ overflow: 'auto', maxHeight: '400px' }}>
                    <h5 className="fw-bold mb-4" style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '12px 20px', zIndex: 1, borderBottom: '2px solid #ddd' }}>
                        Map Location
                    </h5>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Latitude</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter latitude"
                            value={value.latitude || ''}
                            onChange={(e) => handleChange('latitude', e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Longitude</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter longitude"
                            value={value.longitude || ''}
                            onChange={(e) => handleChange('longitude', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
