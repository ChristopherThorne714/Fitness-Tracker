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
    var dr = "week";

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

    const rangeSelect = (e) => {
        if (e.target.id === "week"){
            
        }
    };

    // handle changes from DatePicker
    // const dateChange = (e) => {
    //     const dr = [];
    //     if (e != null) {
    //         for (let i = 0; i < e.length; i++) {
    //             dr[i] = e[i].toISOString().split('T')[0]
    //         };
    //     }
    //     else {
    //         const d = new Date().toISOString().split('T')[0]
    //         dr[0] = d
    //         dr[1] = d
    //     }
    //     dispatch(setDateRange(dr))
    //     dateRange = dr;
    //     fetchWorkouts();
    // };

    return(
        <div className="workout-details">
            <div className="controls-container">
                <h3>Select Range:</h3>
                {/* <DateRangePicker 
                onChange={dateChange}/> */}
                <div className="dr-button">
                    <input type="radio" id="week" name="check-substitution-2" defaultChecked onChange={rangeSelect}/>
                    <label className="btn btn-default" htmlFor="week">Last Week</label>
                </div>
                <div className="dr-button">
                    <input type="radio" id="month" name="check-substitution-2" onChange={rangeSelect}/>
                    <label className="btn btn-default" htmlFor="month">Last Month</label>
                </div>
                <div className="dr-button">
                    <input type="radio" id="sixmonth" name="check-substitution-2" onChange={rangeSelect}/>
                    <label className="btn btn-default" htmlFor="sixmonth">Last Six Months</label>
                </div>
                <div className="dr-button">
                    <input type="radio" id="year" name="check-substitution-2" onChange={rangeSelect}/>
                    <label className="btn btn-default" htmlFor="year">Last Year</label>
                </div>
                <div className="dr-button">
                    <input type="radio" id="sixyear" name="check-substitution-2" onChange={rangeSelect}/>
                    <label className="btn btn-default" htmlFor="sixyear">Last Six Years</label>
                </div>
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