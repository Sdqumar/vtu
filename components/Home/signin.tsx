import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../global/alertError";
import Success from "../global/alertSuccess";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form, signIn } from "./utils";

const SignIn = () => {
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
      await signIn(values);
      setAlert("success");
      setLoading(false);
      setTimeout(() => router.push("/dashboard"), 2000);
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
      {alert === "success" && <Success text="Sign In Successful" />}
      {alert === "error" && <Error text="Incorrect Email or Password" />}

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

      <Button label="sign In" loading={loading} />
    </form>
  );
};
export default SignIn;
