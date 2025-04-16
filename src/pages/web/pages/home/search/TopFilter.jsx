import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setFilter,searchCar} from '../../../../../store/slices/productSlice';



export default function TopFilter() {

    const dispatch = useDispatch();

      const handleChange = (e) => {
            setFilters({ ...filters, [e.target.name]: e.target.value });
          };
          
          const selectStyle = {
            backgroundColor: '#1f2937',
            color: 'white',
            border: '1px solid #374151',
            padding: '10px',
            borderRadius: '5px',
            width: '100%',
          };
    
          const iconBtnStyle = {
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
          };
    

    const [filters, setFilters] = useState({
        brand: 'Infinity',
        model: 'Sedanx50',
        type: 'Door',
        color: 'Red',
        category: 'Sedan',
      });

    const colors = useSelector((state) => state.color.data);
    const data = useSelector((state) => state.product);

    return (
        <>
        
        <div className="row g-3 mb-5 ">
            <div className="col-md-3 col-6">
                <select 
                 onChange={(e) => dispatch(setFilter({'filter':'brand','value':e.target.value}))}    name="brand" 
                 value={data.filters.brand}  
                 style={selectStyle}>
                    <option>Select Brand</option>
                    <option value={'infinity'} >Infinity</option>
                    <option value={'audi'} >Audi</option>
                    <option value={'bmw'}>BMW</option>
                </select>
            </div>

            <div className="col-md-3 col-6">
                <select 
                  name="model" 
                  onChange={(e) => dispatch(setFilter({'filter':'model','value':e.target.value}))}
                  value={data.filters.model} 
                  style={selectStyle}>
                <option>Select Model</option>
                <option value={'Sedanx50'}>Sedanx50</option>
                <option value={'Q7'} >Q7</option>
                <option value={'i8'} >i8</option>
                </select>
            </div>

            <div className="col-md-3 col-6">
                <input
                type="text"
                name="type"
                value={filters.type}
                onChange={handleChange}
                placeholder="Door"
                style={selectStyle}
                />
            </div>

            <div className="col-md-3 col-6 d-flex align-items-center justify-content-end">
                <button onClick={() => dispatch(searchCar())} style={iconBtnStyle}>
                <i className="fas fa-sync-alt"></i>
                </button>
            </div>

            <div className="col-md-3 col-6">
            <select
                name="color"
                onChange={(e) => dispatch(setFilter({'filter':'color','value':e.target.value}))}
                value={data.filters.color} 
                style={selectStyle}
            >
                <option value="">Select Color</option>
                {colors.map((color) => (
                <option key={color.id} value={color.id}>
                    {color.name}
                </option>
                ))}
            </select>
            </div>

            <div className="col-md-3 col-6">
                <select name="category" value={filters.category} onChange={handleChange} style={selectStyle}>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Truck</option>
                </select>
            </div>

        </div>
        </>
    );
}

