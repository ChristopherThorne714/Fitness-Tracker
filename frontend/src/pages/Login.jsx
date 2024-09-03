import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'

const Login = () => {

    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

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
            <button>Log in</button>
        </form>
    )
}

export default Login;