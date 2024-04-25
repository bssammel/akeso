import { useSelector} from 'react-redux'
// import { useEffect } from 'react';

// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormPage/LoginFormPage';
// import ProviderSignupFormModal from "../RegisterUserPages/ProviderSignupModal";
// import PatientSignupFormModal from "../RegisterUserPages/PatientSignupModal";
import PatientTable from './PatientTable';
import PatientView from './PatientView'
import UnauthView from './UnauthView';

function UserView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    
    // useEffect(() => {
    //     await dispat
    // })
    
    return (
        <>
        { !sessionUser && (
            <UnauthView/>
        )}
        { sessionUser && sessionUser.providerBool && (
            <div className='authed provider'>
                {/* give list of all patients of provider */}
                {/* <h2>It looks like you are not signed in! </h2>
                <p>In order to view your patients, providers, or health information, you must be signed in.</p>
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
                </li> */}
                <PatientTable/>

            </div>
        )}
        { sessionUser && !sessionUser.providerBool && (
            <div className='authed patient'>
                <PatientView/>
            </div>
        )}
        </>
    )
}


export default UserView;
