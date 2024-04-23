import { useSelector} from 'react-redux'
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function PatientView() {
    const sessionUser = useSelector((state) => (state.session.user ? state.session.user : null));

    // const { id } = useParams();

    // const patientDetails = useSelector((state) =>
    //     state.patient ? state.patient[id] : null
    // );

    // let patientSelfView;
    // if(!id){
    //     patientSelfView = true;
    // } else {
    //     patientSelfView = false;
    // }

    // let providerViewer;
    // if(sessionUser && !sessionUser.providerBool){
    //     providerViewer = false;
    // } else {
    //     providerViewer = true;
    // }

    return (
        <>
        { !sessionUser && (
            <div className='unauthed'>
                <h1>It looks like you are not signed in!</h1>
                <h2>Unless you are a provider for this patient or the patient themselves, you cannot view this page.</h2>
            </div>
        )}  
        {
            sessionUser && (
                <div className='authed'>
                    <h1>Welcome {sessionUser.firstName}  {sessionUser.lastName}!</h1>

                </div>
            )
        }
        </>
    )
}

export default PatientView;
