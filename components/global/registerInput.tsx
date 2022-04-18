import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  pin: number;
};

type inputProp = {
  register: UseFormRegister<signup>;
  name: "firstName" | "lastName" | "email" | "password" | "phoneNumber" | "pin";
  label:
    | "First name"
    | "Last name"
    | "Email"
    | "Password"
    | "Phone number"
    | "PIN"
    | "Please Enter your Emaill Address";
  required?: boolean;
  errors: any;
  type?: string;
  containerStyle?: string;
  style?: string;
  maxLength?: number;
};

export default function Input({
  register,
  name,
  label,
  required = true,
  errors,
  type = "text",
  containerStyle = "",
  style = "",
  ...rest
}: inputProp) {
  const [Type, setType] = useState(type);
  return (
    <div className="relative my-2">
      <label className="">{label}</label>
      {name === "pin" && (
        <div className="absolute top-[3px] left-10 text-sm text-yellow-400">
          (Your 4 digit PIN to secure your account)
        </div>
      )}
      <div>
        <input
          {...register(name, { required: required })}
          type={Type}
          {...rest}
          className={` ${style} ${errors[name] && "border-red-600"}`}
        />
        {(name === "password" || name === "pin") && Type === "password" && (
          <svg
            onClick={() => setType("text")}
            className="absolute right-3 top-12 h-5 w-5 cursor-pointer fill-black"
            viewBox="0 0 20 20"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {(name === "password" || name === "pin") && Type === "text" && (
          <svg
            onClick={() => setType("password")}
            className="absolute right-3 top-12 h-6 w-6 cursor-pointer text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        )}
      </div>
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
