

function ForbiddenPtView(){
    return (
        <div className='unauthed'>
            <h2>Whoa there!</h2>
            <p>In order to protect our users&apos; privacy, if you are not the patient whose data you are trying to view, we cannot display their data. <br/>Future features will allow legal guardians, medical proxies, or those with power of attorney for a patient to view their data.<br/>If you believe this is an error, please report below. 
            </p>
            <button type="button" onClick={() => alert('Future feature planned for v4.0!')}>Report Issue</button>

            <p><br/><br/> NOTE: This is intentionally displayed to patients like this regardless of whether that patient exists, kind of like how GitHub does not let you know if the sought out repository actually exists or not. <br/>View as a provider to get the &apos;Patient does not exist&apos; page.</p>
            
        </div>
    )
    
}

export default ForbiddenPtView;
