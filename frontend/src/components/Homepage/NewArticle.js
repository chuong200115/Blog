import React, { useState } from 'react';
import axios from 'axios';
import './Homepage.css';
import { useNavigate } from 'react-router';
import HeaderInside from './HeaderInside';

function NewArticle() {
  const navigate = useNavigate();
  const [articleTitle, setArticleTile] = useState('');
  const [articleAbout, setArticleAbout] = useState('');
  const [bio, setBio] = useState('');
  const [Tags, setTags] = useState([]);
  const NewArticle = async (e) => {
    e.preventDefault();    
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/articles/`, {
      article: {
        title: articleTitle,
        description: articleAbout,
        body: bio,
        tagList: Tags,
      },
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }).then(() => {
      alert("Created a new article");
      navigate('/HomeInside');
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div>
      <HeaderInside />
      <div className="row col-12 col-md-10 newarticle">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setArticleTile(e.target.value)}
            placeholder="Article Title"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setArticleAbout(e.target.value)}
            placeholder="What is this article about"
          />
        </div>
        <div className="mb-3">
          <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e) => setBio(e.target.value)} rows="3"> </textarea>
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags"
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" type="button" onClick={(e) => NewArticle(e)}>Publish Article</button>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
