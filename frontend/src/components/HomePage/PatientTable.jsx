import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAbbvPtsByPvdr } from '../../store/providers';
import './PatientTable.css'

function PatientTable() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    const ptArr = useSelector((state) => (state.provider.providerPtArr ? state.provider.providerPtArr : null))

    useEffect(() => {
        const runDispatches = async () => {
            await (dispatch(getAbbvPtsByPvdr()))
        }

        runDispatches();
    }, [dispatch])

    const noPts = !ptArr || !ptArr.length || ptArr.length < 1;
    const hasPts = ptArr && ptArr.length !== 0;

    return (
        <>
        { sessionUser && sessionUser.providerBool && (
            <div className='authed provider'>
                {/* give list of all patients of provider */}
                <h2>My Patients</h2>
                
                {/* do logic check to see if there are actually any patients assigned to provider */}
                { noPts && (
                        <div>
                        <p>It seems that you do not have any patients currently assigned to you. 
                        </p>
                    </div>
                )}
                {hasPts && (
                    <div className='patient-table'>
                        {/* {console.log(ptArr.length)} */}
                        <p>To view to a specific patient&apos;s details, click that row.</p>
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
                            {ptArr.map((ptObj) => { return (
                                
                                <tr className='pt-data-row' key={ptObj.id} onClick={() => navigate(`/patients/${ptObj.id.toString()}`)}>
                                    <th scope='row'>{ptObj.id}</th>
                                    <td>{ptObj.lastName}</td>
                                    <td>{ptObj.firstName}</td>
                                    <td>{ptObj.age}</td>
                                    <td>{ptObj.phone}</td>
                                </tr>)

                            })}
                            </tbody>
                        </table>
                    </div>
                )}
                <button type="button" onClick={() => alert('Future feature planned for either v2.0/Greenlight alongside appointments! It will also have major updates when Practices are added to Akeso.')}>Add Patient to my Service</button>
            </div>
        )}
        </>
    )
}


export default PatientTable;
