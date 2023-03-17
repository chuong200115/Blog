import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Setting from './components/Homepage/Setting';
import HomeInside from './components/Homepage/HomeInside';
import NewArticle from './components/Homepage/NewArticle';
import Profile from './components/Homepage/Profile';
import Chiot from './components/Homepage/Chiot';
import Readmore from './components/Homepage/Readmore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />  */}

    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="setting" element={<Setting />} />
          <Route path="homeinside" element={<HomeInside />} />
          <Route path="newarticle" element={<NewArticle />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="chiot" element={<Chiot />} />
          <Route path="/article/:slug" element={<Readmore />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
