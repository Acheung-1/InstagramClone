import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import avatarIcon from '../assets/avatarIcon.png' 


// components
import PostForm from '../components/PostForm'

const Create = () => {
    const { username } = useParams()
    const { user } = useAuthContext()
    const [ avatar, setAvatar] = useState("")


    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/Profile/'+username, {
                method: "GET",
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            setAvatar(json.profilePicture)
        }
        if (user) {
            fetchUser()
          }
        }, [user, username, avatar])


  return ( 
        <div className="createPost">
            <h1>{username}</h1>
            <img className="profile-picture" src={avatar || avatarIcon} alt="" />
            <br />
            { user && user.username === username && <PostForm />}
        </div>
  )
}
 
export default Create;

