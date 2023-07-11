import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import avatar from '../assets/avatar.png' 

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const Profile = () => {
  const { username } = useParams();
  const { posts, dispatch } = usePostsContext()
  const { user } = useAuthContext()



  const [ image, setImage] = useState("")
  const [ about, setAbout] = useState("")

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImage(base64)
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
      console.log(json)

      setImage(json.profilePicture)
      setAbout(json.about)
      

    }

    if (user) {
      fetchPosts()
      fetchUser()
      console.log(image)
      console.log(about)
    }

  

  }, [dispatch, user, username, image, about])

  const handlePicUpload = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/user/' + user.username, {
      method: 'PATCH',
      body: JSON.stringify({
        profilePicture: image
      }),
      headers: {
        'Authorization' : `Bearer ${user.token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    const json = await response.json()
    console.log(json)

    const response2 = await fetch('/api/user/' + user.username, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${user.token}`,
      }
    })
    const json2 = await response2.json()

    setImage(json2.profilePicture);

  }

  return ( 
    <div className="home">
      <div className="profile">
        <h1>{username}</h1>
        <img className="profile-picture" src={image || avatar} alt="" />
        <br />
        { 
          username === user.username && (
          <>
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
          <button 
            onClick={handlePicUpload}>Confirm Profile Pic</button>
          </>
        )}
        <p>{about}</p>
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