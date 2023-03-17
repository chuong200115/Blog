import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import HeaderInside from './HeaderInside';

function Setting() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    const getProfile = () => {
       axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/profiles/${localStorage.getItem('username')}`)
         .then((res) => {
          setEmail(res.data.profile.email);
          setUsername(res.data.profile.username)
          setBio(res.data.profile.bio)
          setImage(res.data.profile.image)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProfile();
  }, []);
  const Setting = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
      user: {
        email,
        username,
        password,
        bio,
        image,
      },
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };
  const Logout = () => {
    navigate('/');
    localStorage.removeItem('username');
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
    localStorage.setItem('username', e.target.value);
  }

  return (
    <div>
      <HeaderInside />
      <div className="row col-12 col-md-10 setting">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">URL for profile picture</label>
          <input
            type="text"
            className="form-control"
            value={image}
            id="exampleFormControlInput1"
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL for profile picture"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
          <input
            type="text"
            value={username}
            className="form-control"
            id="exampleFormControlInput2"
            onChange={changeUsername}
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea3" className="form-label">Short bio about you</label>
          <textarea className="form-control" id="exampleFormControlTextarea3" onChange={(e) => setBio(e.target.value)} rows="3"> </textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="exampleFormControlInput4"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput5" className="form-label">New password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            id="exampleFormControlInput5"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" type="button" onClick={(e) => Setting(e)}>Update Setting</button>
          <button className="btn btn-primary logout-btn" type="button" onClick={Logout}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
