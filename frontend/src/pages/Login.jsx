import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
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
        .post('http://localhost:5000/api/users/login', {'email' : email, 'password': password})
        .then((res) => {
            if (res.data.success == true) {
                handleSuccess(res.data.message);
                dispatch(login(res.data.user.email));
                navigate("/");
            } else {
                handleError(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
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
            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ></input>
            <button>Log in</button>
            <span>
                Don't have an account? <Link to={"/signup"}>Signup</Link>
            </span>
            <ToastContainer />
        </form>
    )
}

export default Login;