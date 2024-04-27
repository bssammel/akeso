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
