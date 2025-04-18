import { useState } from 'react'


import Search from '../home/search';
export default () => {

  return (
    <div className="bg-black text-white">

      <div
        className="text-center text-white py-5"
        style={{
          backgroundImage: `url('/src/assets/banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="fw-bold text-warning" style={{ fontSize: '3rem' }}>
          Vehicle Vault
        </h2>
        <p className="mt-3 px-3" style={{ maxWidth: '600px', margin: 'auto' }}>
          Explore and discover your ideal vehicle collection.
        </p>
        <button className="btn btn-outline-light mt-3 px-4">View More</button>
      </div>

      <div className="container-fluid bg-black text-white py-4">

        <Search showTop={false} />
      </div>

    </div>
  );


}
