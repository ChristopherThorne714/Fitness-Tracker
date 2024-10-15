import React, { useState } from 'react';
import '../app.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleError = (err) => 
        toast.error("something", {
            position: "bottom-left",
        });

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/users/signup', {'email' : email, 'password': password})
        .then((res) => {
            if (res.data.success == true) {
                navigate("/login");
            } else {
                handleError(res.data.message);
            };
        })
        .catch((err) => {
            handleError(err.response.data.message);
            console.log(err);
        });
    };

    return (
        <form className="signup" onSubmit={onSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ></input>

            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ></input>

            <button type="submit">Sign up</button>
            <span>
                Already have an account? <Link to={"/login"}>Login</Link>
            </span>
            <ToastContainer />
        </form>
    );
};

export default Signup;