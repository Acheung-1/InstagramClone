import { useState } from 'react'
import { useLogIn } from '../hooks/useLogIn'

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { logIn, error, isLoading } = useLogIn()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await logIn(username, password)
    }

    return ( 
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Username</label>
            <input 
                type="username" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Log in</button>

            {error && <div className="error">{error}</div>}

        </form>
    )
}
 
export default Login;