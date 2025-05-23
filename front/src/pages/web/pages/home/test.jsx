import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../../../store/slices/postSlice';

const MyComponent = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector(state => state.postState);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {posts.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
};
export default MyComponent;