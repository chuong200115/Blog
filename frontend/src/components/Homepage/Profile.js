import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import './Homepage.css';
import HeaderInside from './HeaderInside';

const API_ROOT = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [user, setUser] = useState('');
  const { username } = useParams();
  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(`${API_ROOT}/profiles/${username}`)
        .then((response) => {
          setUser(response.data.profile);          
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProfile();
  }, []);
  const follow = async () => {
    await axios
      .post(`${API_ROOT}/profiles/${username}/follow`, null)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setting = () => {
    navigate('/setting');
  };
  
  return (
    // <div>
    //   <div className="anhbia">
    //     <div>
    //       <h1 className="ava">AVATAR</h1>
    //     </div>
    //   </div>
    //   <button className="btn btn-primary" type="button" onClick={user?.username === username ? setting : follow}>{user?.username === username ? 'setting' : 'follow'}</button>
    //   <div className="row align-items-center">
    //     <div className="col">
    //       Two
    //     </div>
    //   </div>
    // </div>
    <div className="profile-page">
      <HeaderInside />
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={user.image || 'http://i.imgur.com/Qr71crq.jpg'} className="user-img" />
              <h4>{user.username}</h4>
              <p>
                {user.bio}
              </p>
              <button
                className="btn btn-sm btn-outline-secondary action-btn"
                onClick={currentUser?.username === user.username ? setting : follow}
              >
                <i className="ion-plus-round" />
                &nbsp;
                {currentUser?.username === user.username ? 'setting' : 'follow'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"> 29</i>
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart">32</i>
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
