import { useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BiSolidEdit} from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import { getPatientUserDetails, getPatientDetails } from '../../store/patients';
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import EditTreatmentModal from './EditTreatmentModal';
import DeleteTreatmentModal from './DeleteTreatmentModal';
import AddTreatmentModal from './AddTreatmentModal';
import './TreatmentsView.css'


function TreatmentsView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    const { patientId } = useParams();

    let patientIdProp;

    if(patientId) patientIdProp = patientId;

    let sessionUserId;

    let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

    if(sessionUser){
        sessionUserId = sessionUser.id
    }

    let treatmentArr;

    if (ptDetailsObj && ptDetailsObj.Treatments){
        console.log("ptDetailsObj and treatments in object exist")
        treatmentArr = ptDetailsObj.Treatments;
        // console.log(treatmentArr)
    }


    let numTreatments;

    if (
        Array.isArray(treatmentArr) &&
        treatmentArr.length &&
        sessionUser
      ) {
        numTreatments = treatmentArr.length;
        if (numTreatments > 0) numTreatments = true;
      } else {
        numTreatments = -1;
      }

    const dispatch = useDispatch()

    useEffect(() => {
        const runDispatches = async () => {
            if(!patientId){
                await dispatch(getPatientUserDetails(sessionUserId))
            } else{
                await dispatch(getPatientDetails(patientId))
            }
        };

        runDispatches()
    }, [sessionUserId, patientId, numTreatments, dispatch])


    return (
        <>
          
        { !ptDetailsObj && sessionUser && (
            <div className='unloaded'>
                <p>Getting that patient data for you!</p>
            </div>
        )}
        {
            ptDetailsObj && sessionUser && (
                <div className='authed treatments'>
                    <h2> Treatments</h2>
                    {treatmentArr.length <1 && <div className='no-conds'>
                        <h4>No treatments are associated to this patient. Please sign in as a provider to add a treatment or as a patient shedule an appointment with a provider to be evaluated.</h4>
                        </div>}
                    {treatmentArr.length > 0 && <div className="treatments-cntnr">
                           {treatmentArr.map((treatmentObj) => { 
                            if(!patientIdProp) patientIdProp = treatmentObj.patientId;
                            return (
                                <div className='item-container' key={treatmentObj.id}>
                                    <div className='treatment-header'>
                                        <h3>{treatmentObj.name}</h3>
                                        {sessionUser.providerBool && (
                                        <div className='provider-actions'>
                                        <ul>
                                        <li>
                                            <OpenModalButton
                                            buttonText={<BiSolidEdit/>}
                                            modalComponent={<EditTreatmentModal state={{ treatmentId:treatmentObj.id, originalName: treatmentObj.name, originalStatus: treatmentObj.status, originalDescription: treatmentObj.description }}/>}
                                            />
                                        </li>
                                        <li>
                                            <OpenModalButton
                                            buttonText={<MdDeleteForever/>}
                                            modalComponent={<DeleteTreatmentModal  state={{ treatmentId: treatmentObj.id}}/>}
                                            />
                                        </li>
                                        </ul>
                                        </div>)}
                                    </div>
                                    <div className='treatment-details'>
                                        <h4>Status: {treatmentObj.status}</h4>
                                        <h4>Notes:</h4>
                                        <p>{treatmentObj.description}</p>
                                    </div>
                                </div>
                           )})}              
                    </div>}
                    {sessionUser.providerBool && (<ul>
                        <li>
                            <OpenModalButton
                            buttonText={"Add New Treatment"}
                            modalComponent={<AddTreatmentModal />}
                            />
                        </li>
                    </ul>)}
                </div>
            )
        }
        </>
    )
}

export default TreatmentsView;
