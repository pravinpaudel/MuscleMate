import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
// date-fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()

  async function handleClick(e) {
    if(!user) {
      return
    }
    
    try {
      const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (response.ok) {
        const json = await response.json()
        dispatch({
          type: "DELETE_WORKOUT", payload: json
        })
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><strong>Day: </strong>{workout.day}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
