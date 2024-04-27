// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { BiSolidHomeHeart } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormPage/LoginFormPage'
// import SignupFormModal from '../SignupFormPage/SignupFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

  const navigate = useNavigate(); 

  return (
    <ul className='nav-parent'>
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li> */}
      <button onClick={() => navigate('/')}>
          <BiSolidHomeHeart />
        </button>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
