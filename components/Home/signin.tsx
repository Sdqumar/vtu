import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../global/alertError";
import Success from "../global/alertSuccess";
import Button from "../global/Button";
import Input from "../global/registerInput";
import { form } from "./utils";
import { signIn } from "../../utils/auth";
import { useUser } from "../context/userContext";
import ForgetPassword from "./ForgetPassword";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showForgetPassword, setshowForgetPassword] = useState(false);
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
  };

  const submitForm = async () => {
    setLoading(true);
    const values = getValues();

    try {
      const user = await signIn(values);
      const { email, displayName, uid } = user.user;
      //@ts-ignore
      userContext?.setUser({ email, displayName, uid });
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
  return !showForgetPassword ? (
    <form
      onSubmit={handleSubmit(submitForm)}
      className=" transition-all duration-700"
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
      <span
        className="relative cursor-pointer self-end text-gray-200 hover:text-white"
        onClick={() => setshowForgetPassword(true)}
      >
        forget password?
      </span>
      <Button label="Sign In" loading={loading} style="bg-black" />
    </form>
  ) : (
    <ForgetPassword />
  );
};
export default SignIn;
