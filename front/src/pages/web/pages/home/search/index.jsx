import { useEffect } from 'react';
import './style.css';

import { useSelector, useDispatch } from 'react-redux';
import CarFilters from './CarFilters';
import CarCard from './CarCard';
import TopFilter from './TopFilter';

import { fetchPosts } from '../../../../../store/slices/postSlice';

export default function Search({ showTop = false }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  const { posts, loading, error } = useSelector((state) => state.postState);

  const containerStyle = {
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '100%',
    marginTop: '30px',
  };

  return (
    <div style={containerStyle}>
      <div className="cars-searchbar container-fluid bg-black text-white py-4">
        {showTop && <TopFilter />}

        <div className="row">
          <div className="col-md-3">
            <CarFilters />
          </div>
          <div className="col-md-9">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="row">
              {posts.map((car, index) => (
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
