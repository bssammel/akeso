import { useSelector} from 'react-redux'

import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage/LoginFormPage';
import SignupFormModal from '../SignupFormPage/SignupFormPage';


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
                <h3>My Patients</h3>
                <div className='patient-table'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Last Name</th>
                                <th scope="col">Last Name</th>
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        )}
        { sessionUser && !sessionUser.providerBool && (
            <div className='authed patient'>
                <h2>{}</h2>
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
        </>
    )
}


export default UserView;
