import { useSelector} from 'react-redux'
import LoginFormModal from '../LoginFormPage/LoginFormPage';
import SignupFormModal from '../SignupFormPage/SignupFormPage';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ProviderSignupFormModal from "./ProviderSignupModal";
import PatientSignupFormModal from "./PatientSignupModal";


function RegisterUserPage() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    
    return (
        // I need to figure out how to prevent a user who has an already existing associated patient or provider from seeing this page. maybe this page can be the edit page too? really need to figure this out.
        <>
        { !sessionUser && (
            <div className='unauthed'>
                <h2>It looks like you are not signed in! </h2>
                <p>In order to view patients, providers, or health information, you must be signed in.</p>
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
            </div>
        )}
        { sessionUser && sessionUser.providerBool && (
            <div className='authed provider'>
                <ProviderSignupFormModal/>
            </div>
        )}
        { sessionUser && !sessionUser.providerBool && (
            <div className='authed patient'>
                <PatientSignupFormModal/>
            </div>
        )}
        </>
    )
}


export default RegisterUserPage;
