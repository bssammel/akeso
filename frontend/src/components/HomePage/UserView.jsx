import { useSelector} from 'react-redux'

import PatientTable from './PatientTable';
import PatientView from './PatientView'
import UnauthView from './UnauthView';

function UserView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    
    
    return (
        <>
        { (!sessionUser || !sessionUser.id) && (
            <UnauthView/>
        )}
        { (sessionUser && sessionUser.providerBool) && (
            <div className='authed provider'>
                <PatientTable/>
            </div>
        )}
        { (sessionUser && !sessionUser.providerBool) && (
            <div className='authed patient'>
                <PatientView/>
            </div>
        )}
        </>
    )
}


export default UserView;
