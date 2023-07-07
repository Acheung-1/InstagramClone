import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signUp = async (firstName, lastName, username, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, username, email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return { signUp, isLoading, error }
    
}