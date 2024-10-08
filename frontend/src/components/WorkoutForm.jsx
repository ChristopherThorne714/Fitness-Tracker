import React, { useState, useRef } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { createWorkout } from '../redux/slices/workoutsSlice';

const WorkoutForm = (props) => {
    const date = useSelector((state) => state.date.value);
    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch()

    const sortErrorRef = useRef(null);
    const groupErrorRef = useRef(null);

    const [error, setError] = useState();

    const [workout, setWorkout] = useState({
        title: "",
        sort: "",
        performedOn: date,
        user: auth,
        musclegroup: "",
        reps: 0,
        sets: 0,
        load: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        duration: "",
        distance: 0,
        laps: 0,
    });

    const onChange = (e) => {
      setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const setDate = () => {
      workout.performedOn = date;
    }

    const setDuration = () => {
      const drtn = workout.hours + ":" + workout.minutes + ":" + workout.seconds;
      workout.duration = drtn;
    };

    // If musclegroup and sort have no value, throw relevant errors 
    // Else check the selected exercise sort and choose correct model for post
    const onSubmit = (e) => {
      e.preventDefault();
      setDate();
      if (workout.sort === "" || workout.musclegroup === "") {
        if (workout.sort === "" ) {
          showSortErrors();
        };
        if (workout.musclegroup === "") {
          showMGErrors();
        };
      }
      else if (workout.sort == "Under Load") {
        axios
        .post('http://localhost:5000/api/underloadworkouts', workout)
        .then((res) => {
          // resetWorkout();
          dispatch(createWorkout(res.data));
        })
        .catch((err) => {
          console.log(err);
          setError(JSON.stringify(err.response.data));
        });
      }
      else if (workout.sort == "Duration") {
        setDuration();
        axios
        .post('http://localhost:5000/api/durationworkouts', workout)
        .then((res) => {
          // resetWorkout();
          dispatch(createWorkout(res.data));
        })
        .catch((err) => {
          console.log(err);
          setError(JSON.stringify(err.response.data));
        });
      }
      else if (workout.sort == "Distance") {
        axios
        .post('http://localhost:5000/api/distanceworkouts', workout)
        .then((res) => {
          // resetWorkout();
          dispatch(createWorkout(res.data));
        })
        .catch((err) => {
          console.log(err);
          setError(JSON.stringify(err.response.data));
        });
      };
    };
    
    const showSortErrors = () => {
      sortErrorRef.current.style.display = "block";
    };
    const showMGErrors = () => {
      groupErrorRef.current.style.display = "block";
    };

    return (
        <div className="create-workout">
          <div className="form-container">
          <div className='closing-ex' onClick={() => {
                props.toggle();
              }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
          </div>
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">New Workout</h1>
                {/* <p className="lead text-center">Create new workout</p> */}
                <form noValidate name="workout form" onSubmit={onSubmit}>
                  
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Workout Name"
                      name="title"
                      className="form-control"
                      value={workout.title}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Performed on</label>
                    <input
                      type="text"
                      placeholder="YYYY-MM-DD"
                      name="performedOn"
                      className="form-control"
                      id="update-form-type"
                      value={date}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      type="text"
                      placeholder="Type of Exercise"
                      name="sort"
                      className="form-control"
                      value={workout.sort}
                      onChange={onChange}
                    >
                      <option value="">Type of Exercise</option>
                      <option value="Under Load">Under Load</option>
                      <option value="Duration">Duration</option>
                      <option value="Distance">Distance</option>
                    </select>
                    {workout.sort === "" && 
                    <b className='workout-form-error' id="workout-form-error" ref={sortErrorRef}>Please Select an exercise type</b>
                    }
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Muscle group</label>
                    <select
                      type="text"
                      placeholder="Musclegroup"
                      name="musclegroup"
                      className="form-control"
                      value={workout.musclegroup}
                      onChange={onChange}
                    >
                      <option value="">Musclegroup</option>
                      <option value="Biceps">Biceps</option>
                      <option value="Triceps">Triceps</option>
                      <option value="Shoulders">Shoulders</option>
                      <option value="Forearms">Forearms</option>
                      <option value="Chest">Chest</option>
                      <option value="Back">Back</option>
                      <option value="Abs">Abs</option>
                      <option value="Quads">Quads</option>
                      <option value="Hamstrings">Hamstrings</option>
                      <option value="Calves">Calves</option>
                      <option value="Cardio">Cardio</option>
                    </select>
                    {workout.musclegroup === "" && 
                    <b className='workout-form-error' id="workout-form-error" ref={groupErrorRef}>Please select a musclegroup</b>
                    }
                  </div>
                  <br />

                  {/* Conditionally render child components based on user selection */}
                  
                  {workout.sort === "Under Load" && <LoadForm 
                  reps={workout.reps}
                  sets={workout.sets}
                  load={workout.load}
                  onChildChange={onChange}

                 />}

                  {workout.sort === "Duration" && <DurationForm 
                  hours={workout.hours}
                  minutes={workout.minutes}
                  seconds={workout.seconds}
                  sets={workout.sets}
                  onChildChange={onChange}
                  />}

                  {workout.sort === "Distance" && <DistanceForm 
                  distance={workout.distance}
                  laps={workout.laps}
                  onChildChange={onChange}
                  />}
                  
                <button
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4 mb-4 w-100">
                  Submit
                </button>
                {error && <div className='error'>{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

// child component for underLoad selection choice
function LoadForm({reps, sets, load, onChildChange}) {

    return (
      <div className="LoadForm">
        <div className="form-group">
          <label>Weight (in lbs)</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="load"
            className="form-control"
            value={load}
            onChange={onChildChange}
            />
        </div>
        <br />
        <div className="form-group">
          <label>Sets</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="sets"
            className="form-control"
            value={sets}
            onChange={onChildChange}
            />
        </div>
        <br />
        <div className="form-group">
          <label>Reps</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="reps"
            className="form-control"
            value={reps}
            onChange={onChildChange}
            />
        </div>
        <br />
      </div>
    );
};

// child component for Duration selection choice
function DurationForm({hours, minutes, seconds, sets, onChildChange}) {

    return (
      <div className="DurationForm">
        <div className="form-group">
        <label>Duration hh/mm/ss</label>
        <div className='duration-form-group'>
          <input
            type="number"
            min="0"
            max="1000"
            name="hours"
            className="form-control"
            value={hours}
            onChange={onChildChange}
            />
            <input
            type="number"
            min="0"
            max="60"
            name="minutes"
            className="form-control"
            value={minutes}
            onChange={onChildChange}
            />
            <input
            type="number"
            min="0"
            max="60"
            name="seconds"
            className="form-control"
            value={seconds}
            onChange={onChildChange}
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <label>Sets</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="sets"
            className="form-control"
            value={sets}
            onChange={onChildChange}
            />
        </div>
        <br />
      </div>
    );
};

// child component for distance selection choice
function DistanceForm({distance, laps, onChildChange}) {

    return (
      <div className="DistanceForm">
        <div className="form-group">
          <label>Distance (imperial)</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="distance"
            className="form-control"
            value={distance}
            onChange={onChildChange}
            />
        </div>
        <br />
        <div className="form-group">
          <label>Laps</label>
          <input
            type="number"
            min="0"
            max="1000"
            name="laps"
            className="form-control"
            value={laps}
            onChange={onChildChange}
            />
        </div>
        <br />
      </div>
    );
};

export default WorkoutForm;