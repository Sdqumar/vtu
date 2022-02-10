import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  network: string;
  PhoneNumber: number;
  amount: number;
  pin: number;
};

type inputProp = {
  register: UseFormRegister<form>;
  name: "PhoneNumber" | "network" | "amount" | "pin";
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
          {...rest}
          className={` ${style} ${errors[name] && "border-red-600"}`}
        />
      </div>
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
