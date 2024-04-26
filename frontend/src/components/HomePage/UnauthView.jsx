// import { useSelector} from 'react-redux'
// import LoginFormModal from '../LoginFormPage/LoginFormPage';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import ProviderSignupFormModal from "../RegisterUserPages/ProviderSignupModal";
// import PatientSignupFormModal from "../RegisterUserPages/PatientSignupModal";

function UnauthView(){
    return (
        <div className='unauthed'>
            <h2>Welcome to Akeso!</h2>
            <p>In order to protect our users&apos; privacy, if you would like to view patients, providers, practices, health information, or manage appointments, you must be signed in.</p>
            {/* <ul>
                <li>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </li>
                <li>
                    <OpenModalButton
                        buttonText="Sign Up as a Provider"
                        modalComponent={<ProviderSignupFormModal />}
                    />
                </li>
                <li>
                    <OpenModalButton
                        buttonText="Sign Up as a Patient"
                        modalComponent={<PatientSignupFormModal />}
                    />
                </li>
            </ul> */}
        </div>
    )
    
}

export default UnauthView;
