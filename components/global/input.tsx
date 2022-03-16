import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  name?: string;
  email?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
  meterNo?: number;
  cardNumber?: number;
  oldpin?: number;
};

type inputProp = {
  register: UseFormRegister<form>;
  name:
    | "phoneNumber"
    | "amount"
    | "pin"
    | "oldpin"
    | "name"
    | "email"
    | "meterNo"
    | "cardNumber";
  label: string;
  required?: boolean;
  errors: any;
  type?: string;
  containerStyle?: string;
  style?: string;
  defaultValue?: string | number | undefined;
  disabled?: boolean;
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
      {errors[name]?.type === "required" && (
        <Errror message={`${label} is required`} />
      )}
      {errors[name] && <Errror message={errors[name].message} />}
    </div>
  );
}
