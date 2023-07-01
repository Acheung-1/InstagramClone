import { useEffect, useState } from 'react'

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const Home = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('api/posts')
            const json = await response.json()

            if (response.ok) {
                setPosts(json)

            }
        }
        fetchPosts()
    }, [])
    return ( 
        <div className="home">
            <div className="posts">
                {posts && posts.map((post) => (
                    <PostDetails key={post._id} post={post}/>
                ))}
            </div>
            <PostForm />
        </div>
     );
}
 
export default Home;