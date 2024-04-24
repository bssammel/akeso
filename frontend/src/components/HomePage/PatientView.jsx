import { useDispatch, useSelector} from 'react-redux'
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientDetails from './PatientDetails';
// import { getPatientUserDetails } from '../../store/patients';


function PatientView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('details');

    useEffect(() => {
        const runDispatches = async () => {
            // await dispatch()
        };

        runDispatches()
    }, [sessionUser, dispatch])



    return (
        <>
        { !sessionUser && (
            <div className='unauthed'>
                <h1>It looks like you are not signed in!</h1>
                <h2>Unless you are a provider for this patient or the patient themselves, you cannot view this page.</h2>
            </div>
        )}  
        {
            sessionUser && (
                <div className='authed'>
                    <h1> {sessionUser.firstName}  {sessionUser.lastName}</h1>
                    <div className="pt-nav-cntnr">
                        <p className="pt-nav-item" onClick={() => { setCurrentView('details') }}><h4 className="nav-description">&nbsp;&nbsp;Details</h4></p>
                        <p className="pt-nav-item" onClick={() => { setCurrentView('conditions') }}><h4 className="nav-description">&nbsp;&nbsp;Conditions</h4></p>
                        <p className="pt-nav-item" onClick={() => { setCurrentView('treatments') }}><h4 className="nav-description">&nbsp;&nbsp;Treatments</h4></p>
                    </div>
                    <div className="content-cntnr"></div>
                    {currentView == 'details' && (<div className="content-item" id="pt-details">
                        <PatientDetails/>
                    </div>)}
                    {currentView == 'conditions' && (<div className="content-item" id="pt-conditions">
                        showing conditions
                    </div>)}
                    {currentView == 'treatments' && (<div className="content-item" id="pt-treatments">
                            showing treaments
                    </div>)}
                </div>
            )
        }
        </>
    )
}

export default PatientView;
