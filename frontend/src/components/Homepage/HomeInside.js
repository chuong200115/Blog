import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderInside from './HeaderInside';
import Article from './Article';
import Pagination from '../Pagination/index';
import Slider from './Slider';
import Tags from './Tags';

function HomeInside() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 0,
  });
  useEffect(() => {
    const getArticle = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/articles?offset=${pagination._page}`)
        .then((response) => {          
          setArticles(response.data.returnArticle);
          setPagination({
            ...pagination,
            _totalRows: response.data.articleCount,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getArticle();
  }, []);
  const onPageChange = async (numPage) => {
    setPagination({ ...pagination, _page: numPage });
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/articles?offset=${numPage}`)
      .then((response) => {
        setArticles(response.data.returnArticle);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="Home">
      <HeaderInside />
      <Slider />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.map((item, index) => (
              <Article key={index} article={item} setArticles={setArticles} />
            ))}
            <Pagination pagination={pagination} onPageChange={onPageChange} />
          </div>
          <div className="col-md-3">
            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeInside;
