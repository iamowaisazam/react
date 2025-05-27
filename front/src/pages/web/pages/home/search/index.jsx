import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../../../store/slices/postSlice';
import CarFilters from './CarFilters';
import CarCard from './CarCard';
import TopFilter from './TopFilter';
import './style.css';

export default function Search({ showTop = false }) {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.postState);

  const [filters, setFilters] = useState({
    catId: '',
    makeId: '',
    modelId: '',
    verId: '',
  });

  useEffect(() => {
    dispatch(fetchPosts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: '20px', borderRadius: '8px', maxWidth: '100%', marginTop: '30px' }}>
      <div className="cars-searchbar container-fluid bg-black text-white py-4">
        {showTop && <TopFilter />}

        <div className="row">
          <div className="col-md-3">
            <CarFilters filters={filters} onChange={handleFilterChange} />
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
