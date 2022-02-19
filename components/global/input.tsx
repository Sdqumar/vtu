import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  name?: string;
  email?: string;
  PhoneNumber?: number;
  amount?: number;
  pin?: number;
  meterNo?: number;
  cardNo?: number;
  oldpin?: number;
};

type inputProp = {
  register: UseFormRegister<form>;
  name:
    | "PhoneNumber"
    | "amount"
    | "pin"
    | "oldpin"
    | "name"
    | "email"
    | "meterNo"
    | "cardNo";
  label: string;
  required?: boolean;
  errors: any;
  type?: string;
  containerStyle?: string;
  style?: string;
  defaultValue?: string | number | undefined;
  disabled?: boolean;
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
  defaultValue = "",
  disabled,
  ...rest
}: inputProp) {
  return (
    <div className="relative my-2">
      <label>{label}</label>
      <input
        {...register(name, { required: required })}
        type={type}
        placeholder={label}
        defaultValue={defaultValue}
        {...rest}
        disabled={disabled}
        className={` ${style} ${errors[name] && "border-red-600"}`}
      />
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
