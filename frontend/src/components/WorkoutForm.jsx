import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';

const WorkoutForm = (props) => {
    const navigate = useNavigate();

    const [workout, setWorkout] = useState({
        title: "",
        sort: "",
        musclegroup: "",
        reps: 0,
        sets: 0,
        load: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        distance: 0,
    });

    const onChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    // onSubmit needs to check for workout type first and then choose the correct model to post to.
    // need to add more api routes for new models with disctriminators 
    const onSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/workouts', workout)
        .then((res) => {
            setWorkout({
                title: "",
                sort: "",
                musclegroup: "",
                reps: 0,
                sets: 0,
                load: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                distance: 0,
                laps: 0,
            });
            navigate("/");
        })
        .catch((err) => {
            console.log("Error in WorkoutForm!")
        });
    };

    return (
        <div className="CreateWorkout">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Add Workout</h1>
                <p className="lead text-center">Create new workout</p>
                <form noValidate onSubmit={onSubmit}>
                  
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
                    <label>Type</label>
                    <select
                      type="text"
                      placeholder="Type of Exercise"
                      name="sort"
                      className="form-control"
                      value={workout.sort}
                      onChange={onChange}
                    >
                      <option value="None">Type of Exercise</option>
                      <option value="Under Load">Under Load</option>
                      <option value="Duration">Duration</option>
                      <option value="Distance">Distance</option>
                    </select>
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
                      <option value="None">Musclegroup</option>
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
                    className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                  >
                    Submit
                  </button>
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
            max="1000"
            name="minutes"
            className="form-control"
            value={minutes}
            onChange={onChildChange}
            />
            <input
            type="number"
            min="0"
            max="1000"
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

export default WorkoutForm;