import { useState } from 'react'
import { useSignUp } from "../hooks/useSignUp"

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp, error, isLoading } = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signUp(firstName, lastName, username, email, password)
    }

    return ( 
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>First Name</label>
            <input 
                type="firstName" 
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last Name</label>
            <input 
                type="lastName" 
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />

            <label>Username</label>
            <input 
                type="username" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Email</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            
            <button disabled={isLoading}>Sign up</button>
        
            { error && <div className="error">{error}</div> }
         </form>
    );
}
 
export default SignUp;