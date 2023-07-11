import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import avatarIcon from '../assets/avatarIcon.png' 
import icon from '../assets/Moments.png' 


const Navbar = () => {
    const { logout } = useLogOut()
    const { user } = useAuthContext()

    const [ avatar, setAvatar] = useState("")


    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/Profile/'+user.username, {
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
        }, [user, avatar])

    const handleClick = () => {
        logout()
    }

    return ( 
        <header>
            <div className="navbar-main">
                <div className="banner">
                    <img className="icon" src={icon} alt="" />
                    <h3>Moments</h3>
                </div>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                { user &&
                    <div className="banner-right">
                        <Link to={user ? `/Profile/${user.username}` : "/login"}>
                            <img className="profile-picture-nav" src={avatar || avatarIcon} alt="" />
                        </Link>
                        <Link to={user ? `/Profile/${user.username}` : "/login"}>
                            <h1>My Profile</h1>
                        </Link>
                        <Link to={`/CreatePost/${user.username}`}>
                            <h1>Create Post</h1>
                        </Link>
                    </div>
                }
                <nav>
                    { user && (
                        <div>
                            <span>Hello, </span>
                            <br />
                            <span>{user.username}</span>
                            <br />
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    { !user && (
                        <div>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
 
export default Navbar;