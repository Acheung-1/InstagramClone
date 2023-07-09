import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'
import avatar from '../assets/avatar.png' 
import icon from '../assets/Moments.png' 


const Navbar = () => {
    const { logout } = useLogOut()
    const { user } = useAuthContext()

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
                <div className="banner-right">
                    {/* <Link to="/">
                        <h1>Home</h1>
                    </Link> */}
                    <Link to={user ? `/Profile/${user.username}` : "/login"}>
                        <img className="profile-picture" src={avatar} alt="" />
                    </Link>
                    <Link to={user ? `/Profile/${user.username}` : "/login"}>
                        <h1>{user.username}</h1>
                    </Link>
                    <Link to="/post/64a3999907b9f278c27d232">
                        <h1>Liked</h1>
                    </Link>
                </div>
                    {/* <Link to={user ? `/Profile/${user.username}` : "/login"}>
        
                        <img className="profile-picture" src={avatar} alt="" />
                        <h1>My Profile</h1>
                    </Link> */}
                {/* </div/> */}
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