// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BiSolidUserDetail } from "react-icons/bi";
//should consider imports for doctor and patient icons, bookmarked
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage/LoginFormPage';
import SignupFormModal from '../SignupFormPage/SignupFormPage';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        //   console.log("toggle menu running");
        e.stopPropagation();
        // console.log(showMenu)
        // console.log(!showMenu)
        setShowMenu(!showMenu);
        // console.log(showMenu)
    };
  

    useEffect(() => {
        // console.log(
        //     "useEffect running where show menu state is either false or true"
        //   );
        if (!showMenu) return;
    //      console.log(
    //   "useEffect running where show menu is supposed to be true"
    // );
    // console.log(showMenu)
    
        const closeMenu = (e) => {
            // console.log("close menu running");
            // if (ulRef.current && !ulRef.current.contains(e.target)) {
              if (!ulRef.current.contains(e.target)){ 
                // console.log("close menu setting false");
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
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
          )}
        </ul>
      </>
    );
  }
  
  export default ProfileButton;
