import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch:workoutDispatch } = useWorkoutContext()

    const logOut = async () => {
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem('user')
        workoutDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return { logOut }
}

