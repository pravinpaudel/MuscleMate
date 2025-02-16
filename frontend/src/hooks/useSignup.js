import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) // cannot sent an object directly so need to convert it to JSON
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }

        if(response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json)) // to store string in local storage that's why stringify

            // Update auth context
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
        }
    }
    return { signup, error, setError, isLoading } 
}