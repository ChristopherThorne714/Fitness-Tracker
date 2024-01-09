import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
      axios
        .get('http://localhost:5000/api/workouts')
        .then((res) => {
          setWorkouts(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const workoutList =
      workouts.length === 0
        ? 'there is no workout record!'
        : workouts.map((workout, k) => <WorkoutCard workout={workout} key={k} />);

    return(
        <div className="home">
        <div className="workouts">
        <div className='list'>{workoutList}</div>
        </div>
        <WorkoutForm />
      </div>
    );
};

export default Home;