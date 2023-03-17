import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { authActions } from '../redux/authSlice';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      user: {
        email,
        username,
        password,
      },
    }).then((response) => {
      dispatch(authActions.loginSuccess(response.data.user));
      localStorage.setItem('user', JSON.stringify(response.data.user.email));
      localStorage.setItem('user', JSON.stringify(response.data.user.password));
      navigate('/setting');
    }).catch((error) => {
      console.log(error);
    });
  };
  const ErrorHandle = () => {
    if (document.getElementById('exampleInputEmail1').value.trim() === '') {
      document.getElementById('exampleInputEmail1').classList.add('invalid');
      document.getElementById('exampleInputEmail1').value = '';
      document.getElementById('exampleInputEmail1').placeholder = 'Xin moi dien username';
    }
  };
  const ErrorHandle2 = () => {
    if (document.getElementById('exampleInputEmail2').value.trim() === '') {
      document.getElementById('exampleInputEmail2').classList.add('invalid');
      document.getElementById('exampleInputEmail2').value = '';
      document.getElementById('exampleInputEmail2').placeholder = 'Xin moi dien email';
    }
  };
  const ErrorHandle3 = () => {
    if (document.getElementById('exampleInputPassword1').value.trim() === '') {
      document.getElementById('exampleInputPassword1').classList.add('invalid');
      document.getElementById('exampleInputPassword1').value = '';
      document.getElementById('exampleInputPassword1').placeholder = 'Xin moi dien password';
    }
  };
  return (
    <div className="Signup">
      <Header />
      <div className="signInWord">Sign up</div>

      <div className="needAnAcc"><Link to="/Signin">Have an account?</Link></div>

      <form className="signinsignup">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={ErrorHandle}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={ErrorHandle2}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={ErrorHandle3}
          />
        </div>
        <button className="btn btn-primary" onClick={signup}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
