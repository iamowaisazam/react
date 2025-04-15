import { useDispatch, useSelector } from "react-redux";
import {nextSlide,prevSlide,goToSlide} from '../../../../../store/slices/sliderSlice';
import bgImage from '/src/assets/background.avif'

export default function Slider (){

    const slider = useSelector((state) => state.slider);
    const dispatch = useDispatch();

    return (

         <div
              id="carCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ 
                minHeight: '550px', 
                // overflow: 'hidden' 
            }}
            >
              <div className="carousel-inner h-100">
                {  

                   slider.data.map((car, index) => ( 

                    <div className={`carousel-item h-100 ${slider.active == car.id ? 'active' : 'd-none'}`}
                        key={index}
                        style={{
                          backgroundImage: `url(${bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: 'white',
                        }}> 
                        <h2 style={{ color: '#d1d5db', fontSize: '2rem' }}>{car.brand}</h2>
                        <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>{car.name}</h1>
                        <img
                        src={car.image}
                        alt={car.name}
                        style={{ maxWidth: '350px', marginTop: '20px' }}
                        />
                    </div>

                   ))
                }
              </div>
        
              {/* Arrows */}
              <button
                onClick={ () => dispatch(prevSlide())}
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                onClick={ () => dispatch(nextSlide())}
                className="carousel-control-next"
                type="button"
                data-bs-target="#carCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>

                <div>
                    <div style={
                        {
                            padding:'5px 0px',
                            textAlign:'center',
                        }
                    } >

                        {
                            slider.data.map((car, index) => ( 
                                <span 
                                onClick={ () => dispatch(goToSlide(car.id))}
                                style={
                                    {
                                        backgroundColor: 'white',
                                        margin: '0px 5px',
                                        padding: '2px 5px',
                                        borderRadius: '11px',
                                    }
                                } key={index} >O</span>
                            ))
                        }
                    </div>
                </div>               
            </div>
    )

}