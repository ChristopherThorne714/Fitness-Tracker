import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    var currentDate = dayjs();

    const {workouts, dispatch} = useWorkoutsContext();
    const [date, setDate] = useState(currentDate.format('YYYY-MM-DD'));

    const fetchWorkouts = async () => {
      axios
      .get('http://localhost:5000/api/workouts', { params: { performedOn: date }})
      .then((res) => {
        dispatch({type: 'SET_WORKOUTS', payload: res.data});
      })
      .catch((err) => {
        console.log(err);
      });
    };

    useEffect(() => {
      fetchWorkouts();
    }, [dispatch]);

    const dateChange = (e) => {
      var d = e.format('YYYY-MM-DD');
      setDate(e);
      fetchWorkouts();
    };

    return(
      <div className='home-container'>
        <div className='date-picker'>
          <h2>Select Date:</h2>
          <DatePicker 
            onChange={dateChange}
            format='YYYY-MM-DD'
            defaultValue={dayjs()}
            disableFuture
          />
        </div>
        <div className="home">
          <div className="workouts">
          {/* <div className='list'>{workoutList}</div> */}
          {workouts && workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
          </div>
          <WorkoutForm 
          date={date} />
        </div>
        </div>
    );
};

export default Home;