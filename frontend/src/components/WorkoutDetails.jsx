import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowWorkoutDetails(props) {
    const [workout, setWorkout] = useState({});
  
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/workouts/${id}`)
        .then((res) => {
          setBook(res.data);
        })
        .catch((err) => {
          console.log('Error from WorkoutDetails');
        });
    }, [id]);
  
    const onDeleteClick = (id) => {
      axios
        .delete(`http://localhost:5000/api/books/${id}`)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => {
          console.log('Error form ShowBookDetails_deleteClick');
        });
    };
};