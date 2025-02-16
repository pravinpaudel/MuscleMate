import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    async function handleSubmit(e) {
        e.preventDefault()

        if(!user){
            setError('You must be logged in.')
            return
        }

        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), // cannot sent an object directly so need to convert it to JSON
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.message)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log("New workout added", json)
            dispatch({ type: "CREATE_WORKOUT", payload: json })
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={Array.isArray(emptyFields) && emptyFields.includes('title') ? 'error' : ''}
                placeholder='E.g Bench Press' />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={Array.isArray(emptyFields) && emptyFields.includes('load') ? 'error' : ''}
                placeholder='25' />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={Array.isArray(emptyFields) && emptyFields.includes('reps') ? 'error' : ''}
                placeholder='25' />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm
