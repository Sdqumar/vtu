import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form, signIn } from "./utils";


const SignIn = () => {
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
      } = useForm<form>();
    
      const submitForm = async() => {
        const values = getValues()
        await signIn(values)
      };
    
    
      return (
        <form
          onSubmit={handleSubmit(submitForm)}
          className="transition-all duration-700"
        >
            <Input
                register={register}
                name="email"
                label="Email"
                type="email"
                errors={errors}
                />
            <Input
                register={register}
                name="password"
                label="Password"
                type="password"
                errors={errors} />

            <Button label="sign In" loading={loading} />

        </form>
    );
};
export default SignIn;