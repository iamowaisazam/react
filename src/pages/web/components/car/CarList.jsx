import React from 'react';
import CarCard from './CarCard';
import carImage from '/src/assets/porsche.png';

const cars = [
  {
    image: carImage,
    name: '2019 Toyota Camry Hybrid',
    type: 'Sedan',
    kms: '60,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 28000,
    owner: 'David Johnson',
    year: '2024',
  },
  {
    image: carImage,
    name: '2021 Ford Mustang GT',
    type: 'Coupe',
    kms: '12,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 45000,
    owner: 'Robert Brown',
    year: '2024',
  },
  {
    image: carImage,
    name: '2021 Ford Mustang GT',
    type: 'Coupe',
    kms: '12,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 45000,
    owner: 'Robert Brown',
    year: '2024',
  },
  {
    image: carImage,
    name: '2021 Ford Mustang GT',
    type: 'Coupe',
    kms: '12,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 45000,
    owner: 'Robert Brown',
    year: '2024',
  },
  {
    image: carImage,
    name: '2021 Ford Mustang GT',
    type: 'Coupe',
    kms: '12,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 45000,
    owner: 'Robert Brown',
    year: '2024',
  },
  {
    image: carImage,
    name: '2021 Ford Mustang GT',
    type: 'Coupe',
    kms: '12,000',
    fuel: 'Diesel',
    transmission: 'Automatic',
    price: 45000,
    owner: 'Robert Brown',
    year: '2024',
  },
 
];

export default function CarList() {
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
