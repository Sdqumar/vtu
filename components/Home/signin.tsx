import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../global/input";

type form = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
}

const SignIn = () => {
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm<form>();

    return (
        <section className="transition-all duration-700">
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

            <button>Regiser</button>
        </section>
    );
};
export default SignIn;