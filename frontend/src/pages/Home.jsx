import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';


function Home() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
      axios
        .get('http://localhost:5000/api/workouts')
        .then((res) => {
          setWorkouts(res.data);
        })
        .catch((err) => {
          console.log('Error from Home');
        });
    }, []);
  
    // const workoutList =
    //   workouts.length === 0
    //     ? 'there is no workout record!'
    //     : workouts.map((workout, k) => <BookCard book={book} key={k} />);

    return(
        <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <p key={workout._id} workout={workout} />
          ))}
        </div>
        {/* <WorkoutForm /> */}
      </div>
    );
};

export default Home;