import '../App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="text-bg-light p-3 d-flex justify-content-around">
      <div className="logo">conduit</div>
      <div className="3nav-button">
        <div>
          <button type="button" className="btn btn-light nav-button"><Link to="/">Home</Link></button>
          <button type="button" className="btn btn-light nav-button"><Link to="/Signin">Sign in</Link></button>
          <button type="button" className="btn btn-light nav-button"><Link to="/Signup">Sign up</Link></button>
        </div>
      </div>

    </div>
  );
}

export default Header;
