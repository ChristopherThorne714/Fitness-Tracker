import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { DatePicker } from '@mui/x-date-pickers';
// import { Link } from 'react-router-dom';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    // const [workouts, setWorkouts] = useState([]);
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(() => {
      const fetchWorkouts = async () => {
        axios
        .get('http://localhost:5000/api/workouts')
        .then((res) => {
          dispatch({type: 'SET_WORKOUTS', payload: res.data});
        })
        .catch((err) => {
          console.log(err);
        });
      };
      fetchWorkouts();
    }, [dispatch]);

    return(
        <div className="home">
          <DatePicker />
          <div className="workouts">
          {/* <div className='list'>{workoutList}</div> */}
          {workouts && workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
          </div>
          <WorkoutForm />
        </div>
    );
};

export default Home;