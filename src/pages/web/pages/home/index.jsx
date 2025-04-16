import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../../../store/slices/counterSlice.js';

import CarFilters from '../../components/car/CarFilters.jsx';
import CarList from '../..//components/car/CarList.jsx';
import Topsearch from "./topsearch/index.jsx";
import Slider from './slider/index.jsx';


 export default function Home () {

  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div className="container bg-black">

       <Slider />
  
    {/* <div className="App bg-danger" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div> */}

    <Topsearch />



      <div className="container-fluid bg-black text-white py-4">
      <div className="row">
        <div className="col-md-3">
          <CarFilters />
        </div>
        <div className="col-md-9">
          <CarList />
        </div>
      </div>
    </div>

    </div>

    
  );


}
