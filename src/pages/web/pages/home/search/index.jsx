import { useState } from 'react'

import './style.css';

import { useSelector } from 'react-redux';
import CarFilters from './CarFilters';
import CarCard from './CarCard';
import TopFilter from './TopFilter';

 export default function Search () {


    const containerStyle = {
   
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '100%',
        marginTop: '30px',
      };

      const cars = useSelector((state) => state.product.data);

return (
    <div style={containerStyle}>

      <div className="cars-searchbar container-fluid bg-black text-white py-4">

          <TopFilter/>

          <div className="row">
            <div className="col-md-3">
              <CarFilters />
            </div>
            <div className="col-md-9">

               <div className="row">
                  {cars.map((car, index) => (
                    <div className="col-md-4" key={index}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
          </div>
        </div>
      </div>


  </div>
);

 }