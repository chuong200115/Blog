import './Homepage.css';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import axios from 'axios';

function Article(props) {
  const handleFavorite = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/articles/favorite`,
      { id: props.article._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } },
    ).then((response) => {      
      props.setArticles((pre) => pre.map((item) => {
          if (item._id === response.data._id) {
            item.favorited = response.data.favorited; 
          }
        return item;
          }
        ));
      })
      .catch(() => {
      alert('yhhh');
    });
  };
  return (
  // <div className="row justify-content-around">
  //   <div className="col-4">
  //     <div className="row">
  //       <div className="container text-center article-border gradient-border padding margin">
  //         <div className="row">
  //           <div className="col">
  //             Avatar
  //           </div>
  //           <div className="col">
  //             <div className="row">
  //               {props.article.author?.username}
  //             </div>
  //             <div className="row">
  //               <Moment fromNow>{props.article.createdAt}</Moment>
  //             </div>
  //           </div>
  //           <div className="col">
  //             Like
  //           </div>
  //         </div>
  //         <div className="row">
  //           <h1>{props.article.title}</h1>
  //         </div>
  //         <div className="row article-body">
  //           <p className="article-body">{props.article.body}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="col-4">
  //     One of two columns
  //   </div>
  // </div>
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={props.article.author?.image || 'http://i.imgur.com/Qr71crq.jpg'} />
        </a>
        <div className="info">
          <button type="button" className="username-button">
            <Link to={`/Profile/${props.article.author?.username}`}>{props.article.author?.username}</Link>
          </button>
          {/* <div className="row username">{props.article.author?.username}</div> */}
          <div className="row">
            <Moment fromNow>{props.article.createdAt}</Moment>
          </div>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={handleFavorite}>
          <i className="ion-heart" /> {props.article.favorited.length}
        </button>
      </div>
      <a href="" className="preview-link">
        <h1>{props.article.title}</h1>
        <p className="article-body">{props.article.body}</p>
        <Link to={`/article/${props.article.slug}`}>Read more...</Link>
      </a>
    </div>
  );
}
export default Article;
