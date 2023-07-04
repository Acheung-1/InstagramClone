import { Link } from 'react-router-dom'

const Navbar = () => {

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
            </div>
        </header>
     );
}
 
export default Navbar;