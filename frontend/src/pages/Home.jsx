import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { Link } from 'react-router-dom';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    // const [workouts, setWorkouts] = useState([]);
    const {workouts, dispatch} = useWorkoutsContext();
    // const useDispatch = (type, payload) => {
    //   dispatch({type: type, payload: payload});
    // }

    useEffect(() => {
      const fetchWorkouts = async () => {
        axios
        .get('http://localhost:5000/api/workouts')
        .then((res) => {
          // useDispatch('SET_WORKOUTS', res.data);
          dispatch({type: 'SET_WORKOUTS', payload: res.data});
        })
        .catch((err) => {
          console.log(err);
        });
      };
      fetchWorkouts();
    }, [dispatch]);
  
    // const workoutList =
    //   workouts.length === 0
    //     ? 'there is no workout record!'
    //     : workouts.map((workout, k) => <WorkoutCard workout={workout} key={k} />);

    // useEffect(() => {
    //   const fetchworkouts = async () => {
    //     const response = await axios.get('http://localhost:5000/api/workouts');
    //     const json = await response.data;

    //     if (response.statusText === 'OK') {
    //       dispatch({type: 'SET_WORKOUTS', payload: json});
    //     };
    //   };

    //   fetchworkouts();
    // }, [dispatch]);


    return(
        <div className="home">
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