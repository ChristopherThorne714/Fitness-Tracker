import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function WorkoutCard({workout}) {
  return (
    <div className='card-container'>
      <div className='desc'>
        <h2>
          <Link to={`/show-workout/${workout._id}`}>{workout.title}</Link>
        </h2>
        <h3>{workout.sort}</h3>
        <p>{workout.musclegroup}</p>
      </div>
    </div>
  );
};

export default WorkoutCard;