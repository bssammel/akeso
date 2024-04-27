import { useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientDetails from './PatientDetails';
import ForbiddenPtView from '../ErrorPages/ForbiddenPtView';
import PtDne from '../ErrorPages/PtDNE';
import UnauthView from './UnauthView';
import './PatientView.css'
import { getPatientDetails, getPatientUserDetails } from '../../store/patients';


function PatientView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    let sessionUserId;

    if(sessionUser) sessionUserId = sessionUser.id;

    let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

    const { patientId } = useParams();

    console.log(ptDetailsObj)

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('details');

    useEffect(() => {
        const runDispatches = async () => {
            if(!patientId){
                await dispatch(getPatientUserDetails(sessionUserId))
            } else{
                await dispatch(getPatientDetails(patientId))
            }
        };

        runDispatches()
    }, [sessionUser, patientId, dispatch])

    let isPtViewSelf = false;

    if(patientId && ptDetailsObj){
        if(sessionUserId === ptDetailsObj.userId){
            isPtViewSelf = true;
        }

    }

    return (
        <>
        {/* if there is no current session */}
        { !sessionUser && (
            <UnauthView/>
        )} 
        {/* if the patient does not exist and the current user is a provider */}
        { ptDetailsObj && ptDetailsObj.status === 404 && sessionUser.providerBool === true && (
            <PtDne/>
        ) }       
         {/*if the current user is a provider and the pt details have not loaded yet  */}
        { !ptDetailsObj && sessionUser && sessionUser.providerBool === true && (
            <div className='unloaded'>
                <p>Getting that patient data for you!</p>
            </div>
        )}
        {/* if the current user is a pt and they are trying to view a pt that is not themselves */}
        {
            sessionUser && sessionUser.providerBool === false && isPtViewSelf === false && (
                <ForbiddenPtView/>
            )
        }
        {/* if the current user is a provider and the patient being views exists and has loaded */}
        {
            ptDetailsObj && ptDetailsObj.status !== 404 && sessionUser && ptDetailsObj && sessionUser.providerBool === true && (
                <div className='authed'>
                    <h1>{ptDetailsObj.firstName}  {ptDetailsObj.lastName}</h1>
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
