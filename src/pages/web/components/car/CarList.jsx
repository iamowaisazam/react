import React from 'react';
import CarCard from './CarCard';
import { useSelector } from 'react-redux';


export default function CarList() {

  const cars = useSelector((state) => state.product.data);

  return (
    <div className="row">
      {cars.map((car, index) => (
        <div className="col-md-4" key={index}>
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );

}
