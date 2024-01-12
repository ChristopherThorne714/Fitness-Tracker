import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


function UpdateWorkout(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const sortErrorRef = useRef(null);
    const groupErrorRef = useRef(null);

    const [error, setError] = useState();

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
        duration: "",
        distance: 0,
        laps: 0,
    });

    const setDuration = () => {
        const drtn = workout.hours + ":" + workout.minutes + ":" + workout.seconds;
        workout.duration = drtn;
    };

    const getDuration = () => {
        const dtnsplit = workout.duration.split(":");
        workout.hours = dtnsplit[0];
        workout.minutes = dtnsplit[1];
        workout.seconds = dtnsplit[2];
    }

    const onChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    useEffect(() => {
    axios
        .get(`http://localhost:5000/api/workouts/${id}`)
        .then((res) => {
        setWorkout({
            title: res.data.title,
            sort: res.data.sort,
            musclegroup: res.data.musclegroup,
            reps: res.data.reps,
            sets: res.data.sets,
            load: res.data.load,
            hours: res.data.hours,
            minutes: res.data.minutes,
            seconds: res.data.seconds,
            duration: res.data.duration,
            distance: res.data.distance,
            laps: res.data.laps,
        });
        })
        .catch((err) => {
        console.log(err.response);
        });
    }, [id]);


    const onSubmit = (e) => {
    e.preventDefault();
    const data = {
        title: workout.title,
        sort: workout.sort,
        musclegroup: workout.musclegroup,
        reps: workout.reps,
        sets: workout.sets,
        load: workout.load,
        hours: workout.hours,
        minutes: workout.minutes,
        seconds: workout.seconds,
        duration: workout.duration,
        distance: workout.distance,
        laps: workout.laps,
    };

    // need to copy the conditional statements from onSubmit in WorkoutForm
    // server is not saving the workout info correctly with api/workouts route
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
        .put(`http://localhost:5000/api/underloadworkouts/${id}`, data)
        .then((res) => {
            navigate('/');
            // navigate(`/show-workout/${id}`);
        })
        .catch((err) => {
            console.log(err.response);
            setError(JSON.stringify(err.response.data));
        });
    }
    else if (workout.sort == "Duration") {
        setDuration();
        axios
        .put(`http://localhost:5000/api/durationworkouts/${id}`, data)
        .then((res) => {
            navigate('/');
            // navigate(`/show-workout/${id}`);
        })
        .catch((err) => {
            console.log(err.response);
            setError(JSON.stringify(err.response.data));
        });
    }
    else if (workout.sort == "Distance") {
        axios
        .put(`http://localhost:5000/api/distanceworkouts/${id}`, data)
        .then((res) => {
            navigate('/');
            // navigate(`/show-workout/${id}`);
        })
        .catch((err) => {
            console.log(err.response);
            setError(JSON.stringify(err.response.data));
        });
    };
    }

    const showSortErrors = () => {
        sortErrorRef.current.style.display = "block";
    };
    const showMGErrors = () => {
        groupErrorRef.current.style.display = "block";
    };

    return (
    <div className='UpdateBookInfo'>
        <div className='container'>
        <div className='row'>
            <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-primary float-left'>
                Home
            </Link>
            </div>
            <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Workout</h1>
            <p className='lead text-center'>Update Workout details</p>
            </div>
        </div>

        <div className='col-md-8 m-auto'>
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
                type='submit'
                className='btn btn-outline-info btn-lg btn-block'
            >
                Update Workout
            </button>
            {error && <div className='error'>{error}</div>}
            </form>
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

export default UpdateWorkout;