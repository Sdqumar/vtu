import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  name?: string;
  PhoneNumber?: number;
  amount?: number;
  pin?: number;
};

type inputProp = {
  register: UseFormRegister<form>;
  name: "PhoneNumber" | "amount" | "pin"|"name";
  label: string;
  required?: boolean;
  errors: any;
  type?: string;
  containerStyle?: string;
  style?: string;
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
  return (
    <div className="my-2 relative">
      <label className="">{label}</label>
      <div>
        <input
          {...register(name, { required: required })}
          type={type}
          placeholder={label}
          {...rest}
          className={` ${style} ${errors[name] && "border-red-600"}`}
        />
      </div>
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
