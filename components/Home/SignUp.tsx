import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../global/Button";
import Input from "../global/input";

type form = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
}

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm<form>();

    return (
        <section className="transition-all duration-700">
            <div className="grid grid-cols-2 gap-2 justify-between">
                <Input
                    register={register}
                    name="firstName"
                    label="First name"
                    errors={errors} />
                <Input
                    register={register}
                    name="lastName"
                    label="Last name"
                    errors={errors} />
            </div>
            <Input
                register={register}
                name="phoneNumber"
                label="Phone number"
                errors={errors} />
            <Input
                register={register}
                name="email"
                label="Email"
                type="email"
                errors={errors} />
                <Input
                    register={register}
                    name="password"
                    label="Password"
                    type="password"
                    errors={errors} />
            <Button label="Sign Up" loading={loading} />
        </section>
    );
};
export default SignUp;