import { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  const [selectedDay, setSelectedDay] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true)
      let url = '/api/workouts'
      if (selectedDay) {
        url += `?day=${selectedDay}`
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok)
        dispatch({ type: "SET_WORKOUTS", payload: json })

      setLoading(false)
    }
    if (user) {
      fetchWorkouts()
    }

  }, [selectedDay, dispatch, user])
  return (
    // <div className='home'> 
    //   <div className='workouts'>
    //     {workouts && workouts.map((workout) => (
    //         <WorkoutDetails key={workouts._id} workout={workout}/>
    //     ))}
    //   </div>
    //   <WorkoutForm />
    // </div>

    <div>
      <h3>Workouts</h3>
      <label>Filter by Day:</label>
      <select
        onChange={(e) => setSelectedDay(e.target.value)}
        value={selectedDay}
      >
        <option value="">All Days</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      {/* {error && <div className="error">{error}</div>} */}
      <div className='home'>
        <div className='workouts'>
          {loading ? (
            <p>Loading workouts...</p>  // Display loading message while fetching data
          ) : (
            workouts && workouts.length > 0 ? (
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))
            ) : (
              <p>No workouts available.</p>
            )
          )}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
}

export default Home
