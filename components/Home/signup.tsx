import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form } from "./utils";
import Error from "../global/alertError";
import Success from "../global/alertSuccess";
import { signUp } from "../../utils/auth";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();

  const submitForm = async () => {
    setLoading(true);
    const values = getValues();
    try {
      await signUp(values);
      setAlert("success");
      setLoading(false);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      console.log(error);
      setAlert("error");
      setLoading(false);
    }
  };
  if (alert) {
    setTimeout(() => setAlert(null), 2000);
  }
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="transition-all duration-700"
    >
      {alert === "success" && <Success text="Sign Up Successful" />}
      {alert === "error" && <Error text="Email has already been registed" />}
      <div className="grid grid-cols-2 justify-between gap-2">
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
      <Input
        register={register}
        name="pin"
        label="PIN"
        type="password"
        maxLength={4}
        errors={errors}
      />
      <Button label="Sign Up" loading={loading} style="bg-black" />
    </form>
  );
};
export default SignUp;
