import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
  bundle?: string;
};
type prices = {
  size: string;
  price: string;
  duration: string;
}[];
type inputProp = {
  register: UseFormRegister<form>;
  name: "bundle";
  label: string;
  required?: boolean;
  errors: any;
  containerStyle?: string;
  data: prices;
};

export default function DataSelect({
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
        {data.map((item, index) => (
          <option value={item.size} key={index}>
            {item.size} - {item.price} - {item.duration}
          </option>
        ))}
      </select>
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>
  );
}
