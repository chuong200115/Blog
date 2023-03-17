import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderInside from './HeaderInside';

function Readmore() {
  const [content, setContent] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [article, setArticle] = useState({});
  const { slug } = useParams();
  const handleComment = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment`, {
      comment: content,
      slug,
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } })
      .then((res) => {
        setCommentsList([res.data.comment, ...commentsList]);
        setContent('');
      });
  };
  useEffect(() => {
    const getComment = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/comment?slug=${slug}`)
        .then((response) => {
          setCommentsList(response.data.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getComment();
  }, []);

  useEffect(() => {
    const getArticle = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/articles/${slug}`)
        .then((response) => {
          setArticle(response.data.article);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getArticle();
  }, []);

  if (!article) return;

  return (
    <div className="article-page">
      <HeaderInside />
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a href="">
              <img src={article.author?.image} />
            </a>
            <div className="info">
              <a href="" className="author">
                {article.author?.username}
              </a>              
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow <span className="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>
              {article.body}
            </p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img src={article.author?.image} />
            </a>
            <div className="info">
              <a href="" className="author">
              {article.author?.username}
              </a>
              
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter"></span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="card-footer">
                {/* <img
                  src={cmt.idcommenter?.image}
                  className="comment-author-img"
                /> */}
                <button className="btn btn-sm btn-primary" onClick={handleComment}>Post Comment</button>
              </div>
            </form>
            {commentsList.map((cmt) => (
              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    {cmt.content}
                  </p>
                </div>
                <div className="card-footer">
                  <a href="" className="comment-author">
                    <img
                      src={cmt.idcommenter.image || 'http://i.imgur.com/Qr71crq.jpg'}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="" className="comment-author">
                    {cmt.idcommenter.username}
                  </a>
                  <span className="date-posted">{cmt.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Readmore;
