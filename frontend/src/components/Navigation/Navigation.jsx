import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormPage/LoginFormPage'
// import SignupFormModal from '../SignupFormPage/SignupFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
