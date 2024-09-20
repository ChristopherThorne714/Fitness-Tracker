import axios from 'axios';

export const getVerification = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/verify', {})
      if (res.data.status === false) {
        return false;
      } else {
        return res.data.user;
      }
    } catch(err) {
      console.log(err);
    };
  };