import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'

const Signup = () => {
    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/users', {'email' : email, 'password': password})
        .then((res) => {
            dispatch(login(res.data.email));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ></input>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ></input>
            <button>Sign up</button>
        </form>
    )
}

export default Signup;