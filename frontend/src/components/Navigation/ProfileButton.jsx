// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BiSolidUserDetail } from "react-icons/bi";
//should consider imports for doctor and patient icons, bookmarked
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage/LoginFormPage';
import ProviderSignupFormModal from '../RegisterUserPages/ProviderSignupModal';
import PatientSignupFormModal from '../RegisterUserPages/PatientSignupModal';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };
  

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
              if (!ulRef.current.contains(e.target)){ 
                setShowMenu(false);
              }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };
    

    // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
    return (
      <>
        <button onClick={toggleMenu}>
          <BiSolidUserDetail />
        </button>
        <ul className={
            // "profile-dropdown remove-bullet" + (showMenu ? "" : " hidden")
            "profile-dropdown" + (showMenu ? "" : " hidden")
          } 
          ref={ulRef}> 
          {user ? (
          <>
            {/* logic for dr, RN etc */}
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
          ) : (
            <>
              <li>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up as Provider"
                  modalComponent={<ProviderSignupFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up as a Patient"
                  modalComponent={<PatientSignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      </>
    );
  }
  
  export default ProfileButton;
