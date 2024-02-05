import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import '../App.css';
import axios from 'axios';
import WorkoutCard from '../components/WorkoutCard';


function ShowWorkoutDetails() {
    const { title } = useParams();
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/workouts/show-workout/${title}/`, { params: { title : title }})
            .then((res) => {
                dispatch({type: 'SET_WORKOUTS', payload: res.data });
            })
            .catch((err) => {
            console.log(err.response);
            });
        }, [title]);

    // handle changes from DatePicker
    const dateChange = (e) => {
        console.log(e)
        const d = e.toISOString().split('T')[0];
        dispatch({type: 'SET_DATE', payload: d});
        date = d;
        fetchWorkouts();
    };

    return(
        <div className="workout-details">
            <h3>Select Date:</h3>
            <DateRangePicker 

            onChange={dateChange}/>
            <div className="graph-container">
            </div>
            <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} showDate={true}/>
            ))}
            </div>
        </div>
    );
};

export default ShowWorkoutDetails;