import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogOut()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return ( 
        <header>
            <div className="navbar-main">
                <Link to="/">
                    <h1>Instagram</h1>
                </Link>
                <Link to="/">
                    <h1>Picture</h1>
                </Link>
                <Link to="/MyProfile">
                    <h1>My Profile</h1>
                </Link>
                <Link to="/post/64a3999907b9f278c27d232">
                    <h1>My Likes</h1>
                </Link>
                <nav>
                    { user && (
                        <div>
                            <span>{user.email}</span>
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