import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAbbvPtsByPvdr } from '../../store/providers';

function PatientTable() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    const ptArr = useSelector((state) => (state.provider.providerPtArr ? state.provider.providerPtArr : null))

    let sessionUserId;
    
    if(sessionUser){
        sessionUserId = sessionUser.id
    }

    useEffect(() => {
        const runDispatches = async () => {
            await (dispatch(getAbbvPtsByPvdr()))
        }

        runDispatches();
    }, [sessionUserId, ptArr])


    return (
        <>
        { sessionUser && sessionUser.providerBool && (
            <div className='authed provider'>
                {/* give list of all patients of provider */}
                <h3>My Patients</h3>
                {/* do logic check to see if there are actually any patients assigned to provider */}
                { !ptArr || ptArr.length < 1 (
                        <div>
                        <p>It seems that you do not have any patients currently assigned to you. If you would like to add a patient to your caseload, please use the buttom below to navigate to a list of all patients available to you. 
                        </p>
                        <button type="button" onClick={() => alert('Future feature planned for either v2.0/Greenlight alongside appointments! It will also have major updates when Practices are added to Akeso.')}>Add Patient to my Service</button>
                    </div>
                )}
                {ptArr && ptArr.length && ptArr.length >= 1 && (
                    <div className='patient-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ptArr.map((ptObj) => {
                                <tr className='pt-data-row' id={ptObj.id} onClick={navigate(`/patients/${ptObj.id.toString()}`)}>
                                    <th scope='row'>{ptObj.id}</th>
                                    <td>{ptObj.lastName}</td>
                                    <td>{ptObj.firstName}</td>
                                    <td>{ptObj.age}</td>
                                    <td>{ptObj.phone}</td>
                                </tr>

                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}
        </>
    )
}


export default PatientTable;
