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


    console.log("hello")

    return (
        <>
          
        { !ptDetailsObj && sessionUser && (
            <div className='unloaded'>
                <p>Getting that patient data for you!</p>
            </div>
        )}
        {
            ptDetailsObj && sessionUser && (
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
                                <p>{reformatISO(ptDetailsObj.dob)}</p>
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
                                <p>{ptDetailsObj.relationshipStatus}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id='contact-info'>
                            <h5>Contact Information</h5>
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
                        <div className='pt-details-item' id='911 contact-info'>
                            <h5>Emergency Contact</h5>
                            <div className='data-item-cntnr' id='name911'>
                                <h6>Name</h6>
                                <p>{ptDetailsObj.name911}</p>
                            </div>
                            <div className='data-item-cntnr' id='phone911'>
                                <h6>Phone</h6>
                                <p>{ptDetailsObj.phone911}</p>
                            </div>
                            <div className='data-item-cntnr' id='street911'>
                                <h6>Street</h6>
                                <p>{ptDetailsObj.street911}</p>
                            </div>
                            <div className='data-item-cntnr' id='city911'>
                                <h6>City</h6>
                                <p>{ptDetailsObj.city911}</p>
                            </div>
                            <div className='data-item-cntnr' id='state911'>
                                <h6>City</h6>
                                <p>{ptDetailsObj.state911}</p>
                            </div>
                            <div className='data-item-cntnr' id='relationship911'>
                                <h6>Relationship</h6>
                                <p>{ptDetailsObj.relationship911}</p>
                            </div>
                        </div>
                        <div className='pt-details-item' id='pharm-details'>
                            <h5>Preferred Pharmacy</h5>
                            <div className='data-item-cntnr' id='pharmName'>
                                <h6>Name</h6>
                                <p>{ptDetailsObj.pharmName}</p>
                            </div>
                            <div className='data-item-cntnr' id='pharmPhone'>
                                <h6>Phone</h6>
                                <p>{ptDetailsObj.pharmPhone}</p>
                            </div>
                            <div className='data-item-cntnr' id='pharmStreet'>
                                <h6>Street</h6>
                                <p>{ptDetailsObj.pharmStreet}</p>
                            </div>
                            <div className='data-item-cntnr' id='pharmCity'>
                                <h6>City</h6>
                                <p>{ptDetailsObj.pharmCity}</p>
                            </div>     
                            <div className='data-item-cntnr' id='pharmState'>
                                <h6>State</h6>
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
