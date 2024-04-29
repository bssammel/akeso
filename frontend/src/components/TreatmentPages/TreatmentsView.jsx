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
    let conditionArr;
    // let conditionNameArr; 

    if (ptDetailsObj && ptDetailsObj.Treatments && ptDetailsObj.Conditions){
        conditionArr = ptDetailsObj.Conditions;
        treatmentArr = ptDetailsObj.Treatments;
        treatmentArr.map((treatmentObj) => {
            const condIdForTmnt = treatmentObj.conditionId;
             treatmentObj.conditionName = conditionArr.map((conditionObj)=> {
                if(condIdForTmnt === conditionObj.id){
                    return conditionObj.name;
                }
            })

        })
    }



    let numTreatments;

    if (
        Array.isArray(treatmentArr) &&
        treatmentArr.length &&
        sessionUser
      ) {
            numTreatments = treatmentArr.length;
            treatmentArr.sort((a,b) => {
                if(a.name < b.name){
                    return -1;
                } else if (a.name > b.name){
                    return 1;
                }
                return 0;
            })
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


    // const formatPeriod = (frequencyPeriod) => {
    //     const returnString = " " + 
    // }

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
                    {treatmentArr.length <1 && <div className='no-treatments'>
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
                                            modalComponent={<EditTreatmentModal state={{ treatmentId:treatmentObj.id, originalName: treatmentObj.name, originalDosage: treatmentObj.dosage, originalFrequencyQuantity: treatmentObj.frequencyQuantity, originalFrequencyPeriod: treatmentObj.frequencyPeriod, conditionArr }}/>}
                                            />
                                        </li>
                                        <li>
                                            <OpenModalButton
                                            buttonText={<MdDeleteForever/>}
                                            modalComponent={<DeleteTreatmentModal  state={{ treatmentId: treatmentObj.id, patientId:patientIdProp}}/>}
                                            />
                                        </li>
                                        </ul>
                                        </div>)}
                                    </div>
                                    <div className='treatment-details'>
                                        {treatmentObj.conditionName && (<h5 id='treatment-for'>- Primarily treats {treatmentObj.conditionName}</h5>)}
                                        {treatmentObj.frequencyPeriod && treatmentObj.frequencyQuantity && (<div id='treatment-plan'>
                                        <h5>&nbsp;-&nbsp;</h5>{treatmentObj.dosage !== "Not Applicable" && treatmentObj.dosage && <h5>{treatmentObj.dosage},&nbsp;</h5>}<h5>{treatmentObj.frequencyQuantity} time</h5>{treatmentObj.frequencyQuantity && treatmentObj.frequencyQuantity !== 1 && (<h5>s</h5>)} {treatmentObj.frequencyPeriod && treatmentObj.frequencyPeriod !== "as needed" && (<h5>&nbsp;per</h5>)}<h5>&nbsp;{treatmentObj.frequencyPeriod}</h5>
                                        </div>)}
                                        {treatmentObj.frequencyPeriod === 'as needed' && !treatmentObj.frequencyQuantity && !treatmentObj.dosage &&(<div id='treatment-plan'>
                                        <h5>&nbsp;-&nbsp;As needed</h5>
                                        </div>)}

                                    </div>
                                </div>
                           )})}              
                    </div>}
                    {sessionUser.providerBool && (<ul>
                        <li>
                            <OpenModalButton
                            buttonText={"Add New Treatment"}
                            modalComponent={<AddTreatmentModal state={{ conditionArr }}/>}
                            />
                        </li>
                    </ul>)}
                    {!sessionUser.providerBool && (<h4>As a patient, you are unable to add, edit, or delete treatments yourself. Discuss any treatment plans with your provider by scheduling an appointment.</h4>)}
                </div>
            )
        }
        </>
    )
}

export default TreatmentsView;
