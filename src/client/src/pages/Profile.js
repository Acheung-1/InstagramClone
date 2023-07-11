import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import avatarIcon from '../assets/avatar.png' 

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const Profile = () => {
  const { username } = useParams();
  const { posts, dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const [ avatar, setAvatar] = useState("")
  const [ about, setAbout] = useState("")
  const [ newAvatar, setNewAvatar ] = useState("")
  const [ newAbout, setNewAbout ] = useState("")
  const [ hide, setHide ] = useState(true)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setNewAvatar(base64)
  }

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

    const fetchUser = async () => {
      const response = await fetch('/api/user/Profile/'+username, {
        method: "GET",
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      setAvatar(json.profilePicture)
      setAbout(json.about)
      

    }

    if (user) {
      fetchPosts()
      fetchUser()
    }
  }, [dispatch, user, username, avatar, about])

  const handlePicUpload = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/user/Profile/' + user.username, {
      method: 'PATCH',
      body: JSON.stringify({
        about: newAbout || about,
        profilePicture: newAvatar || avatar
      }),
      headers: {
        'Authorization' : `Bearer ${user.token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    const json = await response.json()
    json.about = newAbout
    json.profilePicture = newAvatar

    setAvatar(newAvatar);
    setAbout(newAbout)
    setNewAvatar("")
    setNewAbout("")
    setHide(!hide)
  }
  
  const handleHide = async(e) => {
    e.preventDefault()

    setHide(!hide)
    console.log(hide)
  }

  return ( 
    <div className="home">
      <div className="profile">
        <h1>{username}</h1>
        <img className="profile-picture" src={avatar || avatarIcon} alt="" />
        <br />
        { 
          username === user.username && !hide && (
          <div className="update-bio-pic">
            <label htmlFor="prof-file-upload" className="prof-custom-file-upload"> 
              <p>Click to change Profile Picture</p>
            </label>
            <input className = "prof-upload-image" 
              type="file" 
              label="prof-image"
              name="prof-image"
              id="prof-file-upload"
              accept=".jpeg, .png, .jpeg"
              onChange={(e) => handleFileUpload(e)}
            />
            <input
              className="new-bio input-middle"
              type="text" 
              onChange={(e) => setNewAbout(e.target.value)}
              value= {newAbout}
              placeholder= 'Type new bio here...'
            />
            <button 
              onClick={handlePicUpload}>Confirm changes
            </button>
          </div>
        )}
        <p>{about}</p>
        {username === user.username && <button onClick={handleHide}>Edit profile</button>}
        <hr />
      </div>
      { user && user.username === username && <PostForm />}
        <div className="posts">
          {posts && posts.map(post => (
            <PostDetails post={post} key={post._id}/>
          ))}
        </div>
    </div>
  );
}
 
export default Profile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      
      fileReader.onload = () => {
          resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
          reject(error)
      }
  })
}