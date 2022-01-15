import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../global/Button";
import Input from "../global/input";

type signup ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:number;
}

const SignUp = () => {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<signup>();
    
    return (
        <main className="">
            <section className="mt-5 bg-primary-100 max-w-fit  py-1  flex justify-center rounded-3xl ml-4">
                <Button title="Sign In" active={!active} onClick={() => { setActive(false) }} />
                <Button title="Sign Up" active={active} onClick={() => { setActive(true) }} />
            </section>

            <section>
                <div>
                    <Input 
                     register={register}
                     name="firstName"
                     label="First Name"
                     errors={errors}/>
                </div>
            </section>
        </main>
    );
};
export default SignUp;