import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleError = (err) => 
        toast.error(err, {
            position: "bottom-left",
        });
   const handleSuccess = (msg) => 
        toast.success(msg, {
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/users/signup', {'email' : email, 'password': password})
        .then((res) => {
            if (res.data.success == true) {
                handleSuccess(res.data.message);
                navigate("/login");
            } else {
                handleError(res.data.message);
            }
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
            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ></input>
            <button>Sign up</button>
            <span>
                Already have an account? <Link to={"/login"}>Login</Link>
            </span>
            <ToastContainer />
        </form>
    )
}

export default Signup;