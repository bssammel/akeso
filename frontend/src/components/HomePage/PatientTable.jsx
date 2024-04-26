import { useSelector} from 'react-redux'


function PatientTable() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));
    return (
        <>
        { sessionUser && sessionUser.providerBool && (
            <div className='authed provider'>
                {/* give list of all patients of provider */}
                <h3>My Patients</h3>
                {/* do logic check to  */}
                <div className='patient-table'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Last Name</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* logic to see if provider has at least one patient and map function to generate  rows */}
                        </tbody>
                    </table>
                </div>

            </div>
        )}
        </>
    )
}


export default PatientTable;
