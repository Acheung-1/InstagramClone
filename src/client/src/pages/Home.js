import { useEffect } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const Home = () => {
    const {posts, dispatch} = usePostsContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('api/posts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})

            }
        }

        fetchPosts()
    }, [dispatch])
    return ( 
        <div className="home">
            <div className="posts">
                {posts && posts.map(post => (
                    <PostDetails post={post} key={post._id}/>
                ))}
            </div>
            <PostForm />
        </div>
     );
}
 
export default Home;