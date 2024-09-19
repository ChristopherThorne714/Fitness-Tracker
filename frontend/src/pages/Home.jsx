import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import { useCookies } from "react-cookie";

import { useSelector, useDispatch } from 'react-redux';
import { setWorkouts } from '../redux/slices/workoutsSlice';
import { setDate } from '../redux/slices/dateSlice';

import { useVerifyCookie } from '../hooks/useVerifyCookie';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';


function Home() {
    const navigate = useNavigate();

    var user = useSelector((state) => state.auth.value);
    const workouts = useSelector((state) => state.workouts.value);
    var date = useSelector((state) => state.date.value);
    const dispatch = useDispatch();

    const isVerified = useVerifyCookie();

    const [seen, setSeen] = useState(false);
    const [cookies, removeCookie] = useCookies([]);

    const fetchWorkouts = () => {
      axios
      .get(`http://localhost:5000/api/workouts/${user}`, { params: { performedOn : date }})
      .then((res) => {
        dispatch(setWorkouts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    };

    // verify cookies and fetch initial workouts for default date
    useEffect(() => {
      if (!isVerified) navigate('/login');
      fetchWorkouts();
    }, [dispatch, cookies, navigate, removeCookie]);

    // handle changes from DatePicker
    const dateChange = (e) => {
      var d = '';
      e != null ? d = e.toISOString().split('T')[0] : d = new Date().toISOString().split('T')[0]
      dispatch(setDate(d))
      date = d;
      fetchWorkouts();
    };

    const toggleForm = () => {
      setSeen(!seen);
    };

    return(
      <div className='home-container'>
        <div className='date-picker'>
          <h3>Select Date:</h3>
          <DatePicker 
          oneTap={true}
          defaultValue={new Date()}
          onChange={dateChange}/>
        </div>
        <div className="home">
          <div className="workouts">
          {!workouts || Object.entries(workouts).length == 0 ? <p className='missing-workouts'>No workouts found...</p> : (workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout}/>
          )))}
          
          <button
              type='button'
              className='btn btn-outline-info btn-lg btn-block'
              id='add-workout-button'
              onClick={() => {
                toggleForm();
              }}
            >
              <svg title="form-toggle" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
              Add Workout
            </button>
            
          </div>
          {seen && <WorkoutForm toggle={toggleForm}/>}
        </div>
        </div>
    );
};

export default Home;