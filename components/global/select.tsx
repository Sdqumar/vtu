import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  network?: string;
  phoneNumber?: number;
  company?: string;
  plan?: string;
  exam?: string;
  bundle?: string;
  bank?: string;
  provider?: string;
};

type inputProp = {
  register: UseFormRegister<form>;
  name:
    | "phoneNumber"
    | "network"
    | "company"
    | "plan"
    | "exam"
    | "bank"
    | "provider"
    | "bundle";
  label: string;
  required?: boolean;
  errors: any;
  containerStyle?: string;
  data: string[] | undefined;
};

export default function Select({
  register,
  name,
  label,
  required = true,
  errors,
  data,
  ...rest
}: inputProp) {
  return (
    <div className="block">
      <label>{label}</label>
      <select
        {...rest}
        {...register(name, { required: required })}
        className={errors[name] && "border-red-600"}
      >
        {data?.map((item, index) => (
          <option value={item} key={index}>
            {/* {console.log(item)} */}
            {item}
          </option>
        ))}
      </select>
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
