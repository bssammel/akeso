import { TbError404 } from "react-icons/tb";

function PtDne(){
    return (
        <div className='pt-dne'>
            <h2>We&apos;re sorry. <TbError404 />
</h2>
            <p>It appears that this patient does not exist. If you believe this is an error, please report below. 
            </p>
            <button type="button" onClick={() => alert('Future feature planned for v4.0!')}>Report Issue</button>

            <p><br/><br/> NOTE: Only providers can see this patient does not exist page.</p>
            
        </div>
    )
}

export default PtDne;
