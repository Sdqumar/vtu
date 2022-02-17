import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form, submitForm } from "./utils";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<form>();

  return (
    <form
      onSubmit={handleSubmit((formValues) => submitForm(formValues))}
      className="transition-all duration-700"
    >
      <div className="grid grid-cols-2 gap-2 justify-between">
        <Input
          register={register}
          name="firstName"
          label="First name"
          errors={errors}
        />
        <Input
          register={register}
          name="lastName"
          label="Last name"
          errors={errors}
        />
      </div>
      <Input
        register={register}
        name="phoneNumber"
        label="Phone number"
        errors={errors}
      />
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
        errors={errors}
      />
      <Button label="Sign Up" loading={loading} />
    </form>
  );
};
export default SignUp;
