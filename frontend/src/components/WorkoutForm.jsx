import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';




function LoadForm({ children }) {

}

const WorkoutForm = (props) => {
    const navigate = useNavigate();

    const [workout, setWorkout] = useState({
        name: "",
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

    const onSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/workouts', workout)
        .then((res) => {
            setWorkout({
                name: "",
                musclegroup: "",
                reps: 0,
                sets: 0,
                load: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                distance: 0,
            });
            navigate("/");
        })
        .catch((err) => {
            console.log("Error in WorkoutForm!")
        });
    };

    return (
        <div className="CreateBook">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                  Home
                </Link>
              </div>
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Add Workout</h1>
                <p className="lead text-center">Create new workout</p>
                <form noValidate onSubmit={onSubmit}>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Workout Name"
                      name="name"
                      className="form-control"
                      value={workout.name}
                      onChange={onChange}
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    <select
                      type="text"
                      placeholder="Musclegroup"
                      name="musclegroup"
                      className="form-control"
                      value={workout.musclegroup}
                      onChange={onChange}
                      default="Biceps"
                    >
                        <option value="Bicepts">Biceps</option>
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

                  {/* add more form groups */}
                  {/* add conditional form fields based on workout type */}

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

export default WorkoutForm;