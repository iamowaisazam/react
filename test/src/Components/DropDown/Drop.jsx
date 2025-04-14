import { ChevronDown, X , Camera} from 'lucide-react';
import React, { useState } from 'react';
import Card from '../Cards/Card';
import carone from '../../assets/car-one.jpg'
import cartwo from '../../assets/car-two.jpg'
import carthree from '../../assets/car-three.jpg'
import carfour from '../../assets/car-four.jpg'
import carfive from '../../assets/car-five.jpg'
import carsix from '../../assets/car-six.jpg'
import carseven from '../../assets/car-seven.jpg'
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Drop = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedOptions, setSelectedOptions] = useState({
    make: '',
    models: '',
    body: '',
    'fuel type': '',
    transmission: '',
    'driver type': '',
    door: '',
    cylinder: '',
    color: '',
  });

  const [kmRange, setKmRange] = useState(1000000);

  const dropdowns = {
    make: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'],
    models: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Van'],
    body: ['2-Door', '4-Door', 'Hatchback', 'Wagon', 'Convertible'],
    'fuel type': ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
  };

  const dropdownstwo = {
    transmission: ['Manual', 'Automatic', 'CVT', 'DCT'],
    'driver type': ['Left Hand', 'Right Hand'],
    door: ['2 Door', '4 Door', '5 Door'],
    cylinder: ['3 Cylinder', '4 Cylinder', '6 Cylinder', '8 Cylinder'],
    color: ['Black', 'White', 'Silver', 'Red', 'Blue', 'Gray'],
  };

  const handleDropdownClick = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleOptionChange = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    setOpenDropdown(null);
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  
  


  const [selectedFeatures, setSelectedFeatures] = useState(new Set());

  const features = [
    'A/C: Front',
    'Backup Camera',
    'Cruise Control',
    'Navigation',
    'Power Locks',
    'Navigation',
    'Navigation',

    'Power Locks',

  ];



  const singleSelect = [
    'A/C: Front',


    'Navigation',
    'Power Locks',
    'Backup Camera',
    'Cruise Control',

  ];

  const [yearRange, setYearRange] = useState([2011, 2025]); // Initialize as an array with start and end year


  
  const handleCheckboxChange = (feature) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(feature)) {
      newSelected.delete(feature);
    } else {
      newSelected.add(feature);
    }
    setSelectedFeatures(newSelected);
  };
  const handleYearChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'start') {
      // Ensure that start year does not exceed the end year
      setYearRange([value, yearRange[1]]);
    } else {
      // Ensure that end year does not go below the start year
      setYearRange([yearRange[0], value]);
    }
  };
  const cars = [
  
    {
      name: "2019 Toyota Camry Hybrid",
      model: "Sedan",
      kms: "60,000 kms",
      fuel: "Hybrid",
      transmission: "Automatic",
      price: "$28,000",
      owner: "David Johnson",
      image: carfour
    },
    {
      name: "2021 Ford Mustang GT",
      model: "Coupe",
      kms: "12,000 kms",
      fuel: "Petrol",
      transmission: "Manual",
      price: "$45,000",
      owner: "Robert Brown",
      image: carfive
    },
    {
      name: "2017 Honda CR-V",
      model: "SUV",
      kms: "90,000 kms",
      fuel: "Diesel",
      transmission: "Automatic",
      price: "$22,500",
      owner: "Sarah",
      image: carsix
    },
    {
      name: "2016 Lexus RX 350",
      model: "SUV",
      kms: "110,000 kms",
      fuel: "Petrol",
      transmission: "Automatic",
      price: "$35,000",
      owner: "James",
      image: carseven
    },
    {
      name: "2022 Tesla Model S",
      model: "Sedan",
      kms: "5,000 kms",
      fuel: "Electric",
      transmission: "Automatic",
      price: "$85,000",
      owner: "Megan",
      image: carone
    },
    {
      name: "2020 Jeep Wrangler",
      model: "SUV",
      kms: "40,000 kms",
      fuel: "Petrol",
      transmission: "Manual",
      price: "$48,000",
      owner: "Emma",
      image: cartwo
    },
    {
      name: "2018 Nissan Altima",
      model: "Sedan",
      kms: "78,000 kms",
      fuel: "Diesel",
      transmission: "Automatic",
      price: "$22,000",
      owner: "Lucas",
      image: carthree
    },
    {
      name: "2019 Porsche 911 Carrera",
      model: "Coupe",
      kms: "35,000 kms",
      fuel: "Petrol",
      transmission: "Automatic",
      price: "$90,000",
      owner: "Olivia",
      image: carfour
    },
    {
      name: "2020 Subaru Outback",
      model: "SUV",
      kms: "50,000 kms",
      fuel: "Hybrid",
      transmission: "Automatic",
      price: "$38,000",
      owner: "Jack",
      image: carfive
    }
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (option) => {
    setSelectedOption(option); 
  };
  return (
    <>
      <div className='mb-[6rem] w-[100%] h-full flex justify-center gap-[2rem]   drop-main-container mt-[3rem] font-[Poppins]'>
        <div className="w-[25%] h-full bg-[black] fields-container text-[1.4rem]">
  <div className="w-[100%] p-6 bg-black rounded-md shadow-lg border border-[#ffe73a] shadow-white">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-semibold text-gray-200">Filters and Sort</h2>
      <button className="text-slate-400 text-2xl hover:text-gray-700 flex items-center">
        <X size={20} />
        <span className="ml-1">Clear</span>
      </button>
    </div>

    {Object.keys(dropdowns).map((name) => (
      <div key={name} className="mb-4">
        <button
          onClick={() => handleDropdownClick(name)}
          className="w-full px-4 py-3 bg-transparent border border-[#ffe73a] shadow-sm shadow-white rounded-lg flex justify-between items-center hover:border-orange-500"
        >
          <span className="text-white capitalize">
            {selectedOptions[name] || name}
          </span>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-200 ${
              openDropdown === name ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === name && (
          <div className="mt-2 p-2 bg-black border border-[#ffe73a] rounded-lg">
            <select
              value={selectedOptions[name]}
              onChange={(e) => handleOptionChange(name, e.target.value)}
              className="w-full px-2 py-1.5 text-white bg-black border-[#ffe73a] rounded-lg focus:outline-none focus:ring-0 focus:ring-[#ffe73a]"
            >
              <option value="" disabled>
                Select {name}
              </option>
              {dropdowns[name].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    ))}

    <div className="mt-6 mb-6">
  <div className="flex justify-between mb-2">
    <span className="text-[#ffe73a] font-semibold text-3xl">Price:</span>
    <span className="text-gray-200">
      ${priceRange[0]} — ${priceRange[1]}
    </span>
  </div>

  <div className="mb-4">
    <label className="block text-[#ffe73a] text-xl mb-2">Min Price</label>
    <input
      type="range"
      min="0"
      max={priceRange[1]} 
      value={priceRange[0]}
      onChange={(e) => handlePriceChange(e, 'min')}
      className="w-full h-2 bg-[#ffe73a] rounded-lg appearance-none cursor-pointer"
    />
  </div>

  <div>
    <label className="block text-[#ffe73a] text-xl mb-2">Max Price</label>
    <input
      type="range"
      min={priceRange[0]}
      max="50000" 
      value={priceRange[1]}
      onChange={(e) => handlePriceChange(e, 'max')}
      className="w-full h-2 bg-[#ffe73a] rounded-lg appearance-none cursor-pointer"
    />
  </div>
</div>

    {Object.keys(dropdownstwo).map((name) => (
      <div key={name} className="mb-4">
        <button
          onClick={() => handleDropdownClick(name)}
          className="w-full px-4 py-3 bg-black border border-[#ffe73a] rounded-lg flex justify-between items-center hover:border-[#ffe73a] shadow-sm shadow-white"
        >
          <span className="text-gray-200 capitalize">
            {selectedOptions[name] || name}
          </span>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-200 ${
              openDropdown === name ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === name && (
          <div className="mt-2 p-2 bg-transparent border border-[#ffe73a] rounded-lg">
            <select
              value={selectedOptions[name]}
              onChange={(e) => handleOptionChange(name, e.target.value)}
              className="w-full px-2 py-1.5 text-gray-200 bg-black border border-[#ffe73a] rounded-lg"
            >
              <option value="" disabled>
                Select {name}
              </option>
              {dropdownstwo[name].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    ))}



    <div className="W-[100%] p-6  bg-transparent border border-[#ffe73a] rounded-lg shadow-sm shadow-white">
      <h2 className="text-4xl  font-semibold mb-4 text-gray-200">Featured</h2>
      <div className="space-y-3">
        {features.map((feature) => (
          <label
            key={feature}
            className="flex items-center space-x-3 cursor-pointer group "
          >
            <input
              type="checkbox"
              checked={selectedFeatures.has(feature)}
              onChange={() => handleCheckboxChange(feature)}
              className="w-6 h-6 text-gray-200  border-gray-300 rounded focus:ring-[#ffe73a] cursor-pointer checkbox"
            />
            <span className="featured-container text-[1.5rem] text-gray-200 group-hover:text-[#ffe73a]">
              {feature}
            </span>
          </label>
        ))}
      </div>
    </div>


    <div className="w-[100%] p-6 bg-transparent border border-[#ffe73a] rounded-lg shadow-sm shadow-white">
      <h2 className="text-4xl font-semibold mb-4 text-gray-200">Single Select</h2>
      <div className="space-y-3">
        {singleSelect.map((singleOption) => (
          <label
            key={singleOption}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="singleSelectOption"
              value={singleOption}
              checked={selectedOption === singleOption} 
              onChange={() => handleRadioChange(singleOption)}
              className="w-6 h-6 text-gray-200 border-gray-300 rounded focus:ring-[#ffe73a] cursor-pointer"
            />
            <span className="featured-container text-[1.5rem] text-gray-200 group-hover:text-[#ffe73a]">
              {singleOption}
            </span>
          </label>
        ))}
      </div>
    </div>





  </div>
</div>









<div className='w-[75%]  h-full cards-parent-container cards-parent-container-two'>





{cars.map((car, index) => (
        <Card
          key={index}
          name={car.name}
          model={car.model}
          km={car.kms}
          fuel={car.fuel}
          transmission={car.transmission}
          price={car.price}
          owner={car.owner}
          src={car.image}
        />
      ))}


</div>

     
  </div>
      <Footer/>
    </>
  );
};

export default Drop;


























