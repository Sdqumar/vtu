import Button from "../global/Button";
import { useState } from "react";
const SignUp = () => {
    const [active,setActive]=useState(false);

    return (
        <div className="">
            <div className="mt-5 bg-primary-100 max-w-fit  py-1  flex justify-center rounded-3xl ml-4">
                <Button title="Sign In" active={!active} onClick={()=>{setActive(false)}} />
                <Button title="Sign Up" active={active} onClick={()=>{setActive(true)}}/>
            </div>
        </div>
    );
};
export default SignUp;