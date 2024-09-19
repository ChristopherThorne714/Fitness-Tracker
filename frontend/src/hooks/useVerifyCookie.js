import axios from 'axios';
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { login, logout } from '../redux/slices/authSlice';

export const useVerifyCookie = async () => {
  const [cookies, removeCookie] = useCookies([]);
  const dispatch = useDispatch();

  var user = useSelector((state) => state.auth.value);

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      axios
      .post('http://localhost:5000/api/users/verify', {})
      .then((res) => {
        if (!res.data.status) {
          removeCookie('token');
          dispatch(logout());
          setIsVerified(false);
        } else {
          dispatch(login(res.data.user));
          user  = res.data.user;
          setIsVerified(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    verifyCookie();
  }, [dispatch, removeCookie]);
  return isVerified;
  }
