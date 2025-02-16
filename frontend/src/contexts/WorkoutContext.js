import React, { createContext, useReducer } from 'react'

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return { 
                // create a new array, add new workout to the front and spread the previous elements in the array 
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

// Wrap around the root component
// Children - will be the compontents it wraps, here <App />
const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

  return (
    <WorkoutContext.Provider value={{...state, dispatch}}>
        {/* Without this noting will show on the page */}
        { children } 
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider
