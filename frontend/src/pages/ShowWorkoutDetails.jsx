import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import '../App.css';
import axios from 'axios';
import WorkoutCard from '../components/WorkoutCard';


function ShowWorkoutDetails() {
    const { title } = useParams();
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/workouts/${title}/`, { params: { title : title }})
            .then((res) => {
                dispatch({type: 'SET_WORKOUTS', payload: res.data });
            })
            .catch((err) => {
            console.log(err.response);
            });
        }, [title]);

        return(
            <div className="workout-details">
                <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutCard key={workout._id} workout={workout} />
                ))}
                </div>
            </div>
        );
};

export default ShowWorkoutDetails;