import { useDispatch, useSelector } from "react-redux";
import { nextSlide, prevSlide, goToSlide } from '../../../../../store/slices/sliderSlice';
const path = import.meta.env.VITE_PATH || "";
export default function Slider() {

  const slider = useSelector((state) => state.slider);
  const dispatch = useDispatch();
  const bgImage = path + '/src/assets/background.avif';
  return (

    <div
      id="carCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        minHeight: '550px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '15px',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000', // fallback
      }}

    >
      <div className="carousel-inner h-100">
        {slider.data.map((car, index) => (
          <div
            className={`carousel-item h-100 ${slider.active === car.id ? 'active' : 'd-none'
              }`}
            key={index}
            style={{

              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              padding: '40px 20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>
              {car.brand.charAt(0).toUpperCase() + car.brand.slice(1)}
            </h1>

            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>{car.name}</h1>
            <img
              src={car.image}
              alt={car.name}
              style={{
                maxWidth: '40%',
                marginTop: '30px',
                borderRadius: '10px',
                boxShadow: '0 0 25px rgba(255,255,255,0.1)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => dispatch(prevSlide())}
        className="carousel-control-prev"
        type="button"
        style={{ width: '5%' }}
      >
        <span
          className="carousel-control-prev-icon bg-dark rounded-circle"
          style={{ padding: '12px' }}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        onClick={() => dispatch(nextSlide())}
        className="carousel-control-next"
        type="button"
        style={{ width: '5%' }}
      >
        <span
          className="carousel-control-next-icon bg-dark rounded-circle"
          style={{ padding: '12px' }}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Indicators */}
      <div className="position-absolute w-100" style={{ bottom: '15px' }}>
        <div className="d-flex justify-content-center">
          {slider.data.map((car, index) => (
            <span
              onClick={() => dispatch(goToSlide(car.id))}
              key={index}
              style={{
                height: '12px',
                width: slider.active === car.id ? '32px' : '12px',
                margin: '0 6px',
                backgroundColor: slider.active === car.id ? '#facc15' : '#ffffff',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>

  )

}