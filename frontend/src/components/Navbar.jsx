import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies([]);

  const user = useSelector((state) => state.auth.value);

  const onClick = (e) => {
    dispatch(logout());
    removeCookie('token');
    navigate('/login');
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Fitness Ally</h1>
        </Link>
        <nav>
          {user ? 
          <div>
            <button onClick={onClick}>Log out</button>
          </div> : 
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>}
        </nav>
      </div>
    </header>
  )
}

export default Navbar