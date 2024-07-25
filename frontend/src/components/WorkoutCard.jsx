import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../redux/slices/workoutsSlice'
import '../App.css';
import axios from 'axios';


function WorkoutCard({workout, showDate}) {
  // const { dispatch } = useWorkoutsContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:5000/api/workouts/${id}`)
      .then((res) => {
        // dispatch({type: 'DELETE_WORKOUT', payload: res.data});
        dispatch(deleteWorkout(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='card-container'>
      <div className='desc'>
        <h2>
          <Link to={`/show-workout/${workout.title}`}>{workout.title}</Link>
        </h2>
        <h3>{workout.sort}</h3>
        <h4>{workout.musclegroup}</h4>
        {/* I don't know what my idea was for including this line */}
        {/* {showDate == true && <h5>{workout.performedOn.slice(0, 10)}</h5>} */}
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
        <div className='button-container'>
         <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(workout._id);
              }}
            >
              Delete Workout
            </button>
            <button
              type='button'
              className='btn btn-outline-warning btn-lg btn-block'
              onClick={() => {
                navigate(`/edit-workout/${workout._id}`);
              }}
            >
              Update Workout
            </button>
          </div>
    </div>
  );
};

export default WorkoutCard;