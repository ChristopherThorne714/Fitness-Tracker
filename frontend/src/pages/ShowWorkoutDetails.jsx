import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setWorkouts } from '../redux/slices/workoutsSlice';
import { setDateRange } from '../redux/slices/dateRangeSlice';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { getVerification } from '../utils/getVerification';
import { login, logout } from '../redux/slices/authSlice';

import 'rsuite/dist/rsuite-no-reset.min.css';
import '../app.css';
import axios from 'axios';

import WorkoutCard from '../components/WorkoutCard';
import DetailsGraph from "../components/DetailsGraph";

function ShowWorkoutDetails() {
    const { title } = useParams();
    var dateRange = useSelector((state) => state.dateRange.value);
    var user = useSelector((state) => state.auth.value);
    const workouts = useSelector((state) => state.workouts.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);

    var currentDate = new Date();
    var startDate = null;

    const fetchWorkouts = () => {
        axios
        .get(`http://localhost:5000/api/workouts/show-workout/${user}/${title}/`, { params: { dateRange : dateRange }})
        .then((res) => {
            dispatch(setWorkouts(res.data));
        })
        .catch((err) => {
        console.log(err.response);
        });
    };

    useEffect(() => {
        const verify = async () => {
            const isVerified = await getVerification();
            if (isVerified === false) {
              removeCookie('token');
              dispatch(logout());
              navigate('/login');
            } else {
              dispatch(login(isVerified));
              user = isVerified;
              fetchWorkouts();
            }
          };
          verify();
        }, [dispatch, navigate, setCookie, removeCookie]);

    // helper function for getting the correct date range from radio button clicks
    const addMonths = (date, months) => {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    };

    // builds the dateRange list before calling dispatch
    const rangeSet = (s) => {
        if (s === "week") {
            startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        }
        else if (s === "month") {
            startDate = addMonths(currentDate, -1).toISOString().split('T')[0];
        }
        else if (s === "sixmonth") {
            startDate = addMonths(currentDate, -6).toISOString().split('T')[0];
        }
        else if (s === "year") {
            startDate = addMonths(currentDate, -12).toISOString().split('T')[0];
        }
        else if (s === "sixyear") {
            startDate = addMonths(currentDate, -72).toISOString().split('T')[0];
        }
        currentDate = new Date();
        var dr = [startDate, currentDate.toISOString().split('T')[0]];
        dispatch(setDateRange(dr));
        dateRange = dr;
        fetchWorkouts();
        // console.log(dateRange);
    };
    // triggers when radio buttons are clicked
    const rangeSelect = (e) => {
        if (e.target.id === "week"){
            rangeSet("week");
        }
        else if (e.target.id === "month") {
            rangeSet("month");
        }
        else if (e.target.id === "sixmonth") {
            rangeSet("sixmonth");
        }
        else if (e.target.id === "year") {
            rangeSet("year");
        }
        else if (e.target.id === "sixyear") {
            rangeSet("sixyear");
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