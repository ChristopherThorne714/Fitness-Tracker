import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setWorkouts } from '../redux/slices/workoutsSlice';
import { setDateRange } from '../redux/slices/dateRangeSlice';

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import '../App.css';
import axios from 'axios';

import WorkoutCard from '../components/WorkoutCard';
import DetailsGraph from "../components/DetailsGraph";

function ShowWorkoutDetails() {
    const { title } = useParams();
    const workouts = useSelector((state) => state.workouts.value);
    const dispatch = useDispatch();

    var dateRange = useSelector((state) => state.dateRange.value)

    const fetchWorkouts = () => {
        axios
            .get(`http://localhost:5000/api/workouts/show-workout/${title}/`)
            .then((res) => {
                dispatch(setWorkouts(res.data));
            })
            .catch((err) => {
            console.log(err.response);
            });
    };

    useEffect(() => {
        fetchWorkouts();
        }, [title]);

    // handle changes from DatePicker
    const dateChange = (e) => {
        const dr = [];
        if (e != null) {
            for (let i = 0; i < e.length; i++) {
                dr[i] = e[i].toISOString().split('T')[0]
            };
        }
        else {
            const d = new Date().toISOString().split('T')[0]
            dr[0] = d
            dr[1] = d
        }
        dispatch(setDateRange(dr))
        dateRange = dr;
        fetchWorkouts();
    };

    return(
        <div className="workout-details">
            <h3>Select Range:</h3>
            <DateRangePicker 
            // oneTap={true}
            onChange={dateChange}/>
            <div class="btn-group" role="group" aria-label="Date Range">
                <button type="button" class="btn btn-secondary">Left</button>
                <button type="button" class="btn btn-secondary">Middle</button>
                <button type="button" class="btn btn-secondary">Right</button>
            </div>
            <div className="graph-container">
                <DetailsGraph />
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