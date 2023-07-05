import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import SinglePost from './pages/SinglePost'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path ="/"
              element = {<Home />}
              />
            <Route 
              path ="/MyProfile"
              element = {<MyProfile />}
              />
            <Route 
              path="post/:id" 
              element = { <SinglePost/>}
              />
            <Route 
              path="login" 
              element = { <Login/>}
            />
            <Route 
              path="signup" 
              element = { <SignUp/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
