import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'

const Navbar = () => {
    const { logout } = useLogOut()

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
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <Link to="/MyProfile">
                    <h1>My Profile</h1>
                </Link>
                <Link to="/">
                    <h1>My Likes</h1>
                </Link>
                <nav>
                    <div>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    <div>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </nav>
            </div>
        </header>
     );
}
 
export default Navbar;