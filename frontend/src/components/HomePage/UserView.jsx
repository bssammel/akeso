import { useSelector} from 'react-redux'

import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage/LoginFormPage';
import SignupFormModal from '../SignupFormPage/SignupFormPage';
import PatientTable from './PatientTable';
import PatientView from './PatientView'


function UserView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    return (
        <>
        { !sessionUser && (
            <div className='unauthed'>
                <h2>It looks like you are not signed in! </h2>
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
                </li>
            </div>
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
