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
      const d = e.toISOString().split('T')[0];
      // dispatch({type: 'SET_DATE', payload: d});
      dispatch(setDate(d))
      date = d;
      fetchWorkouts();
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
          {workouts && workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} showDate={false}/>
          ))}
          </div>
          <WorkoutForm />
        </div>
        </div>
    );
};

export default Home;