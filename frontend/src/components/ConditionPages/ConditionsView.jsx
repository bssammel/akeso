import { useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BiSolidEdit} from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import { getPatientUserDetails, getPatientDetails } from '../../store/patients';
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import EditConditionModal from './EditConditionModal';
import DeleteConditionModal from './DeleteConditonModal';
import AddConditionModal from './AddConditionModal';
import './ConditionsView.css'


function ConditionsView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    const { patientId } = useParams();

    let patientIdProp;

    if(patientId) patientIdProp = patientId;

    let sessionUserId;

    let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

    if(sessionUser){
        sessionUserId = sessionUser.id
    }

    let conditionArr;

    if (ptDetailsObj && ptDetailsObj.Conditions){
        console.log("ptDetailsObj and conditions in object exist")
        conditionArr = ptDetailsObj.Conditions;
        // console.log(conditionArr)
    }


    let numConditions;

    if (
        Array.isArray(conditionArr) &&
        conditionArr.length &&
        sessionUser
      ) {
        numConditions = conditionArr.length;
        if (numConditions > 0) numConditions = true;
      } else {
        numConditions = -1;
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
    }, [sessionUserId, patientId, numConditions, dispatch])


    return (
        <>
          
        { !ptDetailsObj && sessionUser && (
            <div className='unloaded'>
                <p>Getting that patient data for you!</p>
            </div>
        )}
        {
            ptDetailsObj && sessionUser && (
                <div className='authed conditions'>
                    <h2> Conditions</h2>
                    <div className="conditions-cntnr">
                           {conditionArr.map((conditionObj) => { 
                            if(!patientIdProp) patientIdProp = conditionObj.patientId;
                            return (
                                <div className='item-container' key={conditionObj.id}>
                                    <div className='condition-header'>
                                        <h3>{conditionObj.name}</h3>
                                        {sessionUser.providerBool && (
                                        <div className='provider-actions'>
                                        <ul>
                                        <li>
                                            <OpenModalButton
                                            buttonText={<BiSolidEdit/>}
                                            modalComponent={<EditConditionModal state={{ conditionId:conditionObj.id, originalName: conditionObj.name, originalStatus: conditionObj.status, originalDescription: conditionObj.description }}/>}
                                            />
                                        </li>
                                        <li>
                                            <OpenModalButton
                                            buttonText={<MdDeleteForever/>}
                                            modalComponent={<DeleteConditionModal  state={{ conditionId: conditionObj.id, patientId:patientIdProp }}/>}
                                            />
                                        </li>
                                        </ul>
                                        </div>)}
                                    </div>
                                    <div className='condition-details'>
                                        <h4>Status: {conditionObj.status}</h4>
                                        <h4>Notes:</h4>
                                        <p>{conditionObj.description}</p>
                                    </div>
                                </div>
                           )})}              
                    </div>
                    {sessionUser.providerBool && (<ul>
                        <li>
                            <OpenModalButton
                            buttonText={"Add New Condition"}
                            modalComponent={<AddConditionModal />}
                            />
                        </li>
                    </ul>)}
                </div>
            )
        }
        </>
    )
}

export default ConditionsView;
