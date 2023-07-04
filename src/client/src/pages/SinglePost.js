import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePostsContext } from '../hooks/usePostsContext'


// components
import PostDetails from '../components/PostDetails'
// import PostForm from '../components/PostForm'

const SinglePost = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState(null)

    useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts/'+id)
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
                {posts && 
                    <PostDetails post={posts} key={posts._id}/>
                }
            </div>
        </div>
     );
}
 
export default SinglePost;