import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


const onDeleteClick = (id) => {
  axios
    .delete(`http://localhost:5000/api/workouts/${id}`)
    .then((res) => {
      navigate('/');
    })
    .catch((err) => {
      console.log('Error form WorkoutCard_deleteClick');
    });
};

function WorkoutCard({workout}) {
  return (
    <div className='card-container'>
      <div className='desc'>
        <h2>
          <Link to={`/show-workout/${workout._id}`}>{workout.title}</Link>
        </h2>
        <h3>{workout.sort}</h3>
        <h4>{workout.musclegroup}</h4>
      </div>
        {workout.sort === "Under Load" && 
          <div className='stats'>
            <h3>Load (lbs): {workout.load}</h3>
            <h3>Reps: {workout.reps}</h3>
            <h3>Sets: {workout.sets}</h3>
          </div>
        }
        {workout.sort === "Duration" && 
          <div className='stats'>
            <h3>Duration: {workout.duration}</h3>
            <h3>Sets: {workout.sets}</h3>
          </div>
        }
        {workout.sort === "Distance" && 
          <div className='stats'>
            <h3>Distance (imperial): {workout.distance}</h3>
            <h3>Laps: {workout.laps}</h3>
          </div>
        }
         <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(workout._id);
              }}
            >
              Delete Workout
            </button>
    </div>
  );
};

export default WorkoutCard;