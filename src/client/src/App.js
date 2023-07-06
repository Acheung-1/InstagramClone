import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import SinglePost from './pages/SinglePost'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path ="/"
              element = {user ? <Home /> : <Navigate to="/login" />}
              />
            <Route 
              path ="/MyProfile"
              element = {user ? <MyProfile /> : <Navigate to="/login" />}
              />
            <Route 
              path="post/:id" 
              element = {<SinglePost/>}
              />
            <Route 
              path="login" 
              element = {!user ? <Login/> : <Navigate to="/" />}
            />
            <Route 
              path="signup" 
              element = {!user ? <SignUp/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
