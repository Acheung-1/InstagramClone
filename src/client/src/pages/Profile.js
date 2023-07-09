import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import avatar from '../assets/avatar.png' 

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const Profile = () => {
  const { username } = useParams();
  const {posts, dispatch} = usePostsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({type: 'SET_POSTS', payload: null})
      const response = await fetch('/api/posts/Profile/'+username, {
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

  }, [dispatch, user, username])

  return ( 
    <div className="home">
      <div className="profile">
        <h1>{username}</h1>
        <img className="profile-picture" src={avatar} alt="" />
      </div>
      {/* <label htmlFor="file-upload" className="custom-file-upload"> 
                <img className="uploaded-image" src={image|| imageIcon} alt="" />
            </label>
            <input className = "upload-image" 
                type="file" 
                label="image"
                name="image"
                id="file-upload"
                accept=",jpeg, .png, .jpeg"
                onChange={(e) => handleFileUpload(e)}
            /> */}
      { user && posts && user.username === posts[0].username && <PostForm />}
      {/* <PostForm /> */}
        <div className="posts">
          {posts && posts.map(post => (
            <PostDetails post={post} key={post._id}/>
          ))}
        </div>
    </div>
  );
}
 
export default Profile;