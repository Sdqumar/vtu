import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Success from "../global/alertSuccess";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form } from "./utils";
import { useUser } from "../context/userContext";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);
  const userContext = useUser();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();

  type user = {
    email: string;
    uid: string;
    displayName: string;
    pin?: number;
  };

  const submitForm = async () => {
    setLoading(true);
    const values = getValues();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, values.email);
      setAlert("success");
      setLoading(false);
      setTimeout(() => router.reload(), 1000);
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
      className=" transition-all duration-700"
    >
      {alert === "success" && <Success text="Please Check your Email Indox" />}

      <Input
        register={register}
        name="email"
        label="Please Enter your Emaill Address"
        type="email"
        errors={errors}
      />

      <Button label="Reset Password" loading={loading} style="bg-black" />
    </form>
  );
};
export default SignIn;
