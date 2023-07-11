import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from "react-router-dom";


// components
import PostDetails from '../components/PostDetails'

const SinglePost = () => {
  const { id } = useParams();
  const { posts, dispatch } = usePostsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({type: 'SET_POSTS', payload: null})
      const response = await fetch('/api/posts/'+id, {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      
      const json = await response.json()
            
      if (response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    }

    if (user) {
      fetchPosts()
    }

  }, [dispatch, user, id])

  return ( 
    <div className="home">
        <div className="posts">
          <Link to="/">Click to go back to homepage</Link>
          {posts && posts.map(post => (
            <PostDetails post={post} key={post._id}/>
          ))}
        </div>
    </div>
  );
}

 
export default SinglePost;