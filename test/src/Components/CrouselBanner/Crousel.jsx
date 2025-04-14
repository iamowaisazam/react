import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import backgroundImage from '../../assets/background.avif'
import ferrari from '../../assets/ferrari.png';
import gtr from '../../assets/gtr.png';
import lamborghini from '../../assets/lamborghini.png';
import mercedes from '../../assets/mercedes.png';
import tesla from '../../assets/tesla.png';

const Crousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const carData = [
      {
        name: "Lamborghini",
        model: "Aventador SVJ",
        image: lamborghini, 
        textPosition: "top",
      },
      {
        name: "Ferrari",
        model: "Ferrari 488 GTB",
        image: ferrari, 
        textPosition: "top",
      },
      {
        name: "Tesla",
        model: "Model S Plaid",
        image: tesla, 
        textPosition: "top",
      },
      { 
        name: "GTR",
        model: "GTR Nismo",
        image: gtr, 
        textPosition: "top",
      },
      {
        name: "Mustang",
        model: "Mustang GT",
        image: mercedes, 
        textPosition: "top",
      },
    ];

    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carData.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? carData.length - 1 : prevIndex - 1
      );
    };

  return (
    <div className="crousel relative w-[100%] ">
      <div className="relative crousel-container-for-height h-[400px] bg-black overflow-hidden" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="flex h-full transition-transform duration-500 ease-in-out relative">
          {carData.map((car, index) => (
            <div
              key={index}
              className={`w-full h-full flex-shrink-0 transition-all duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{
                position: 'absolute',
                left: 0,
                transform: `translateX(${(index - currentIndex) * 100}%) translateY(${index === currentIndex ? '0px' : '10px'})`,
                transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
              }}
            >
              <div className={`absolute w-full text-center text-white z-10 ${car.textPosition === 'top' ? 'top-4' : 'bottom-8'}`}>
                <h2 className="text-[4rem] car-name font-light mt-[1rem]">{car.name}</h2>
                <h3 className="text-[6rem] car-model font-bold mt-[-2rem]">{car.model}</h3>
              </div>

              <div className="absolute inset-0 flex items-center justify-center mt-[15rem]">
                <img
                  src={car.image}
                  alt={`${car.name} ${car.model}`}
                  className="object-contain max-h-[85%] w-[40%] mt-[-8rem] model-car"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          title="Previous"
          onClick={prevSlide}
          className="previous-btn absolute left-20 top-1/2 mt-[-5rem] ml-[-0.6rem] bg-[#1f1f1f] text-[#ffe73a] hover:bg-[#333333] p-2 rounded-full transition-all duration-300 ease-in-out z-20"
        >
          <ChevronLeft className="w-[5rem] h-[5rem] mr-[0.7rem] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-white" />
        </button>
        <button
          title="Next"
          onClick={nextSlide}
          className="next-btn absolute right-4 top-1/2 -translate-y-1/2 mt-[-1.3rem] mr-[1.5rem] bg-[#1f1f1f] text-[#ffe73a] hover:bg-[#333333] p-2 rounded-full transition-all duration-300 ease-in-out z-20"
        >
          <ChevronRight className="w-[5rem] h-[5rem] ml-[0.5rem]  transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export default Crousel;
