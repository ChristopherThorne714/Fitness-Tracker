import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { DatePicker } from 'rsuite';

import { useSelector, useDispatch } from 'react-redux';
import { setWorkouts } from '../redux/slices/workoutsSlice';
import { setDate } from '../redux/slices/dateSlice';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    // const currentDate = new Date();
    // const {workouts, dispatch} = useWorkoutsContext();
    const workouts = useSelector((state) => state.workouts.value);
    const dispatch = useDispatch();

    // var { date } = useWorkoutsContext();
    var date = useSelector((state) => state.date.value);

    const [seen, setSeen] = useState(false);

    // old method of tracking and setting date variable
    // var currentDate = dayjs();
    // var [date, setDate] = useState(currentDate.format('YYYY-MM-DD'));

    const fetchWorkouts = () => {
      axios
      .get('http://localhost:5000/api/workouts', { params: { performedOn : date }})
      .then((res) => {
        // dispatch({type: 'SET_WORKOUTS', payload: res.data});
        dispatch(setWorkouts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    };

    // initial workouts fetch for default date
    useEffect(() => {
      fetchWorkouts();
    }, [dispatch]);

    // handle changes from DatePicker
    const dateChange = (e) => {
      var d = '';
      e != null ? d = e.toISOString().split('T')[0] : d = new Date().toISOString().split('T')[0]
      // dispatch({type: 'SET_DATE', payload: d});
      dispatch(setDate(d))
      date = d;
      fetchWorkouts();
    };

    const toggleForm = () => {
      setSeen(!seen);
    };

    return(
      <div className='home-container'>
        <div className='date-picker'>
          <h3>Select Date:</h3>
          <DatePicker 
          oneTap={true}
          defaultValue={new Date()}
          onChange={dateChange}/>
        </div>
        <div className="home">
          <div className="workouts">
          {/* <div className='list'>{workoutList}</div> */}
          {!workouts || Object.entries(workouts).length == 0 ? <p className='missing-workouts'>No workouts found...</p> : (workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} showDate={false}/>
          )))}
          <button
              type='button'
              className='btn btn-outline-info btn-lg btn-block'
              id='add-workout-button'
              onClick={() => {
                toggleForm();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
              Add Workout
            </button>
            
          </div>
          {seen && <WorkoutForm toggle={toggleForm}/>}
        </div>
        </div>
    );
};

export default Home;