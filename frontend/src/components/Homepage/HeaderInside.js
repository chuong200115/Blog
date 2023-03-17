import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HeaderInside() {
  const user = useSelector((state) => state.auth.login.currentUser);  
  return (
    <div className="text-bg-light p-3 d-flex justify-content-around HeaderInside">
      <div className="logo">conduit</div>
      <div className="3nav-button">
        <button type="button" className="btn btn-light nav-button headerInside-button"><Link to="/HomeInside">Home</Link></button>
        <button type="button" className="btn btn-light nav-button headerInside-button"><Link to="/NewArticle">New Article</Link></button>
        <button type="button" className="btn btn-light nav-button headerInside-button"><Link to="/Setting">Settings</Link></button>
        <button type="button" className="btn btn-light nav-button headerInside-button"><Link to={`/Profile/${localStorage.getItem('username')}`}>Account</Link></button>
        <button type="button" className="btn btn-light nav-button headerInside-button"><Link to="/Chiot">Chiot</Link></button>
      </div>
    </div>
  );
}

export default HeaderInside;
