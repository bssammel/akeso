import { useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPatientUserDetails, getPatientDetails } from '../../store/patients';


function PatientDetails() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    const { patientId } = useParams();

    let sessionUserId;

    let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

    // if(!ptDetailsObj.Patient){
    //     console.log("Patient is accessed through get patient by id")
    // } else if(ptDetailsObj.Patient){
    //     // restructure object for universal use
        
    // }

    if(sessionUser){
        sessionUserId = sessionUser.id
    }

    if(sessionUser && sessionUser.providerBool){
        console.log("user is a provider that must be viewing a patient and the get patient by id route using params will be necessary");
        console.log("make sure that patient id is the right param to be used inthe the patient details jsx file")
        console.log("patientId: ", patientId)
    }

    const dispatch = useDispatch()

    // const [currentView, setCurrentView] = useState('details');

    useEffect(() => {
        const runDispatches = async () => {
            if(!patientId){
                await dispatch(getPatientUserDetails(sessionUserId))
            } else{
                await dispatch(getPatientDetails(patientId))
            }
        };

        runDispatches()
    }, [sessionUserId, patientId, dispatch])


    console.log()

    return (
        <>  
        { !ptDetailsObj && (
            <div className='unloaded'>
                <p>Fetching that patient data for you!</p>
            </div>
        )}
        {
            ptDetailsObj && (
                <div className='authed'>
                    <h3> Patient Details</h3>
                    <div className="pt-details-cntnr">
                        <div className='pt-details-item' id='basic-details'>
                            <h5>At a Glance</h5>
                            <div className='data-item-cntnr' id='age'>
                                <h6>Age</h6>
                                <p>{ptDetailsObj.age}</p>
                            </div>
                            <div className='data-item-cntnr' id='sex'>
                                <h6>sex</h6>
                                <p>{ptDetailsObj.sex}</p>
                            </div>
                            <div className='data-item-cntnr' id='gender'>
                                <h6>gender</h6>
                                <p>{ptDetailsObj.gender}</p>
                            </div>
                            <div className='data-item-cntnr' id='dob'>
                                <h6>Date of Birth</h6>
                                <p>{ptDetailsObj.dob}</p>
                            </div>
                            <div className='data-item-cntnr' id='religion'>
                                <h6>Religion</h6>
                                <p>{ptDetailsObj.religion}</p>
                            </div>
                            <div className='data-item-cntnr' id='ethnicity'>
                                <h6>Race</h6>
                                <p>{ptDetailsObj.ethnicity}</p>
                            </div>
                            <div className='data-item-cntnr' id='language'>
                                <h6>Primary Language</h6>
                                <p>{ptDetailsObj.language}</p>
                            </div>
                            <div className='data-item-cntnr' id='relationshipStatus'>
                                <h6>Relationship Status</h6>
                                <p>{ptDetailsObj.language}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id='Contact Information'>
                            <h5></h5>
                            <div className='data-item-cntnr' id='email'>
                                <h6>Email Address</h6>
                                <p>{ptDetailsObj.email}</p>
                            </div>
                            <div className='data-item-cntnr' id='phone'>
                                <h6>Phone</h6>
                                <p>{ptDetailsObj.phone}</p>
                            </div>
                            <div className='data-item-cntnr' id='street'>
                                <h6>Street Address</h6>
                                <p>{ptDetailsObj.street}</p>
                            </div>
                            <div className='data-item-cntnr' id='city'>
                                <h6>City</h6>
                                <p>{ptDetailsObj.city}</p>
                            </div>
                            <div className='data-item-cntnr' id='State'>
                                <h6>State</h6>
                                <p>{ptDetailsObj.State}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id=''>
                        <h5></h5>
                            <div className='data-item-cntnr' id='age'>
                                <h6>Age</h6>
                                <p>{ptDetailsObj.age}</p>
                            </div>
                            <div className='data-item-cntnr' id='sex'>
                                <h6>sex</h6>
                                <p>{ptDetailsObj.sex}</p>
                            </div>
                            <div className='data-item-cntnr' id='gender'>
                                <h6>gender</h6>
                                <p>{ptDetailsObj.gender}</p>
                            </div>
                            <div className='data-item-cntnr' id='dob'>
                                <h6>Date of Birth</h6>
                                <p>{ptDetailsObj.dob}</p>
                            </div>
                            <div className='data-item-cntnr' id='religion'>
                                <h6>Religion</h6>
                                <p>{ptDetailsObj.religion}</p>
                            </div>
                            <div className='data-item-cntnr' id='ethnicity'>
                                <h6>Race</h6>
                                <p>{ptDetailsObj.ethnicity}</p>
                            </div>
                            <div className='data-item-cntnr' id='language'>
                                <h6>Primary Language</h6>
                                <p>{ptDetailsObj.language}</p>
                            </div>
                            <div className='data-item-cntnr' id='relationshipStatus'>
                                <h6>Relationship Status</h6>
                                <p>{ptDetailsObj.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default PatientDetails;
