import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { DatePicker } from '@mui/x-date-pickers';
// import { css } from '@emotion/react'
import dayjs from 'dayjs'
// import { Link } from 'react-router-dom';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
// import { Typography } from '@mui/material';


function Home() {
    // const [workouts, setWorkouts] = useState([]);
    const {workouts, dispatch} = useWorkoutsContext();
    const [date, setDate] = useState(new Date());

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
      setDate(e.$d);
      fetchWorkouts();
    }

    return(
      <div className='home-container'>
        <div className='date-picker'>
          <h2>Select Date:</h2>
          <DatePicker 
            onChange={dateChange}
            defaultValue={dayjs(new Date())}
            maxDate={dayjs(new Date())}
          />
        </div>
        <div className="home">
          <div className="workouts">
          {/* <div className='list'>{workoutList}</div> */}
          {workouts && workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
          </div>
          <WorkoutForm />
        </div>
        </div>
    );
};

export default Home;