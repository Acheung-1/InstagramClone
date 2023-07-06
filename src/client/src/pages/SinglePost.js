import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// components
import PostDetails from '../components/PostDetails'

const SinglePost = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts/'+id, {
        headers: {
            'Authorization' : `Bearer ${user.token}`
        }
    })
      const json = await response.json()

      if (response.ok) {
        setPosts(json)
      }
    }
    if (user) {
      fetchPosts()
    }
  }, [id, user])
    
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