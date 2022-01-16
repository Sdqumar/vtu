import React, { useState } from "react";
import FormBtn from "./formBtn";
import SignIn from "./signin";
import SignUp from "./signup";


const Form = () => {
    const [active, setActive] = useState(false);
    
    return (
        <main className="w-[23rem] m-5">
            <section className="mt-5 bg-primary-100 max-w-fit  py-1  flex justify-center rounded-3xl ml-4">
                <FormBtn title="Sign In" active={!active} onClick={() => { setActive(false) }} />
                <FormBtn title="Sign Up" active={active} onClick={() => { setActive(true) }} />
            </section>

            <section>
               {active? <SignUp/> :<SignIn/>}
             </section>
        </main>
    );
};
export default Form;