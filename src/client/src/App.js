import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useState, useEffect } from 'react'

// pages & components
import Home from './pages/Home'
import Profile from './pages/Profile'
import SinglePost from './pages/SinglePost'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import NoMatch from './pages/NoMatch'
import Create from './pages/Create'


function App() {
  const { user } = useAuthContext()

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    setLoggedIn(Boolean(loggedUser));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
        <div className="pages">
          { loggedIn !== null &&
            <Routes>
              <Route 
                exact path ="/"
                element = {user ? <Home /> : <Navigate to="/login" />}
              />
              <Route 
                path="/login" 
                element = {!user ? <Login/> : <Navigate to="/" />}
              />
              <Route 
                path="/signup" 
                element = {!user ? <SignUp/> : <Navigate to="/" />}
              />
              <Route 
                path ="/Profile/:username"
                element = {user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route 
                path="/post/:id" 
                element = {user ? <SinglePost/> : <Navigate to="/login" />}
              />
              <Route 
                path ="/CreatePost/:username"
                element = {user ? <Create /> : <Navigate to="/login" />}
              />
              <Route path="*" element={ <NoMatch/> } />
            </Routes>
          }
        </div>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
