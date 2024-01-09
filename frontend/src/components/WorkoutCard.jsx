import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function WorkoutCard({workout}) {
  return (
    <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Books'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-book/${workout._id}`}>{workout.title}</Link>
        </h2>
        <h3>{workout.sort}</h3>
        <p>{workout.musclegroup}</p>
      </div>
    </div>
  );
};

export default WorkoutCard;