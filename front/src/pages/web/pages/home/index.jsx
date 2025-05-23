import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../../../store/slices/counterSlice.js';
import Search from "./search";
import Slider from './slider/index.jsx';
import MyComponent from './test.jsx';


export default function Home() {

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

      <Search showTop={true} />

      <MyComponent />
    </div>


  );


}
