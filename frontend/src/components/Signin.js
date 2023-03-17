/* eslint-disable spaced-comment */
import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import { authActions } from '../redux/authSlice';

function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [username, setUsername] = useState('');
  const signin = async (e) => {
    //khong co reload lai page
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      user: {
        email,
        password,
      },
    }).then((response) => {
      dispatch(authActions.loginSuccess(response.data.user));
      localStorage.setItem('jwt', response.data.user.token);
      localStorage.setItem('username', response.data.user.username);
      navigate('/HomeInside');
    }).catch(() => {
      alert('Wrong username or password!');
    });
  };

  const ErrorHandle = () => {
    if (document.getElementById('exampleInputEmail1').value.trim() === '') {
      document.getElementById('exampleInputEmail1').classList.add('invalid');
      document.getElementById('exampleInputEmail1').value = '';
      document.getElementById('exampleInputEmail1').placeholder = 'Xin moi dien email';
    }
  };
  const ErrorHandle2 = () => {
    if (document.getElementById('exampleInputPassword1').value.trim() === '') {
      document.getElementById('exampleInputPassword1').classList.add('invalid');
      document.getElementById('exampleInputPassword1').value = '';
      document.getElementById('exampleInputPassword1').placeholder = 'Xin moi dien password';
    }
  };

  return (
    <div className="Signin">
      <Header />

      <div className="signInWord">Sign in</div>

      <div className="needAnAcc"><Link to="/signup">Need an account?</Link></div>

      <form className="signinsignup">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={ErrorHandle}
            required
          />
        </div>
        {/* <span className="form-message"></span> */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={ErrorHandle2}
          />
        </div>
        <button className="btn btn-primary" onClick={signin}>Sign in</button>
      </form>
    </div>
  );
}

export default Signin;
