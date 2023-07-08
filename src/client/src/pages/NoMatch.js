import { Link } from "react-router-dom";

const NoMatch = () => {

    return ( 
        <div className="no-match">
            <h1>Sorry, this page cannot be found</h1>
            <Link to="/">Click to go back to homepage</Link>
        </div>
     );
}
 
export default NoMatch;