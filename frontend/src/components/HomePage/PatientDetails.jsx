import { useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPatientUserDetails, getPatientDetails } from '../../store/patients';

const reformatISO = function (givenString){

    const givenDate = new Date(givenString)
    const dateFormatString = givenDate.toDateString()
    let reformattedDateString = '';

    reformattedDateString = dateFormatString.slice(4,10) + "," + dateFormatString.slice(10, 15);

    return reformattedDateString;
}

function PatientDetails() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    const { patientId } = useParams();

    let sessionUserId;

    let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

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
                console.log("hitting patient view dispatch")
                await dispatch(getPatientUserDetails(sessionUserId))
            } else{
                console.log("hitting provider specifi dispatch")
                await dispatch(getPatientDetails(patientId))
            }
        };

        runDispatches()
    }, [sessionUserId, patientId, dispatch])


    return (
        <>
          
        { !ptDetailsObj && sessionUser && (
            <div className='unloaded'>
                <p>Getting that patient data for you!</p>
            </div>
        )}
        {
            ptDetailsObj && sessionUser && (
                <div className='authed details'>
                    <h2> Patient Details</h2>
                    <div className="pt-details-cntnr">
                        <div className='pt-details-item' id='basic-details'>
                            <h4>At a Glance</h4>
                            <div className='data-items-all'>
                            <div className='data-item-cntnr' id='age'>
                                <h5>Age</h5>
                                <p>{ptDetailsObj.age}</p>
                            </div>
                            <div className='data-item-cntnr' id='sex'>
                                <h5>Legal Sex Marker</h5>
                                <p>{ptDetailsObj.sex}</p>
                            </div>
                            <div className='data-item-cntnr' id='gender'>
                                <h5>Gender Identity</h5>
                                <p>{ptDetailsObj.gender}</p>
                            </div>
                            <div className='data-item-cntnr' id='dob'>
                                <h5>Date of Birth</h5>
                                <p>{reformatISO(ptDetailsObj.dob)}</p>
                            </div>
                            <div className='data-item-cntnr' id='religion'>
                                <h5>Religion</h5>
                                <p>{ptDetailsObj.religion}</p>
                            </div>
                            <div className='data-item-cntnr' id='ethnicity'>
                                <h5>Race</h5>
                                <p>{ptDetailsObj.ethnicity}</p>
                            </div>
                            <div className='data-item-cntnr' id='language'>
                                <h5>Primary Language</h5>
                                <p>{ptDetailsObj.language}</p>
                            </div>
                            <div className='data-item-cntnr' id='relationshipStatus'>
                                <h5>Relationship Status</h5>
                                <p>{ptDetailsObj.relationshipStatus}</p>
                            </div>
                            </div>
                        </div>
                        <div className='pt-details-item' id='contact-info'>
                            <h4>Contact Information</h4>
                            <div className='data-item-cntnr' id='email'>
                                <h5>Email Address</h5>
                                <p>{ptDetailsObj.email}</p>
                            </div>
                            <div className='data-item-cntnr' id='phone'>
                                <h5>Phone</h5>
                                <p>{ptDetailsObj.phone}</p>
                            </div>
                            <div className='data-item-cntnr' id='street'>
                                <h5>Street Address</h5>
                                <p>{ptDetailsObj.street}</p>
                            </div>
                            <div className='data-item-cntnr' id='city'>
                                <h5>City</h5>
                                <p>{ptDetailsObj.city}</p>
                            </div>
                            <div className='data-item-cntnr' id='State'>
                                <h5>State</h5>
                                <p>{ptDetailsObj.state}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id='emer-info'>
                            <h4>Emergency Contact</h4>
                            <div className='data-item-cntnr' id='name911'>
                                <h5>Name</h5>
                                <p>{ptDetailsObj.name911}</p>
                            </div>
                            <div className='data-item-cntnr' id='phone911'>
                                <h5>Phone</h5>
                                <p>{ptDetailsObj.phone911}</p>
                            </div>
                            <div className='data-item-cntnr' id='street911'>
                                <h5>Street</h5>
                                <p>{ptDetailsObj.street911}</p>
                            </div>
                            <div className='data-item-cntnr' id='city911'>
                                <h5>City</h5>
                                <p>{ptDetailsObj.city911}</p>
                            </div>
                            <div className='data-item-cntnr' id='state911'>
                                <h5>City</h5>
                                <p>{ptDetailsObj.state911}</p>
                            </div>
                            <div className='data-item-cntnr' id='relationship911'>
                                <h5>Relationship</h5>
                                <p>{ptDetailsObj.relationship911}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id='pharm-details'>
                            <h4>Preferred Pharmacy</h4>
                            <div className='data-item-cntnr' id='pharmName'>
                                <h5>Name</h5>
                                <p>{ptDetailsObj.pharmName}</p>
                            </div>
                            {/* <div className='data-item-cntnr' id='pharmPhone'>
                                <h5>Phone</h5>
                                <p>{ptDetailsObj.pharmPhone}</p>
                            </div> */}
                            <div className='data-item-cntnr' id='pharmStreet'>
                                <h5>Street</h5>
                                <p>{ptDetailsObj.pharmStreet}</p>
                            </div>
                            <div className='data-item-cntnr' id='pharmCity'>
                                <h5>City</h5>
                                <p>{ptDetailsObj.pharmCity}</p>
                            </div>     
                            <div className='data-item-cntnr' id='pharmState'>
                                <h5>State</h5>
                                <p>{ptDetailsObj.pharmState}</p>
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
