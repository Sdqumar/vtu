import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type form = {
    network?: string;
    PhoneNumber?: number;
    company?:string;
  };
  
  type inputProp = {
    register: UseFormRegister<form>;
    name: "PhoneNumber" | "network" |"company"  ;
    label: string;
    required?: boolean;
    errors: any;
    containerStyle?: string;
    data:string[]
  };


export default function Select({register,name,label,required=true,errors,data,...rest}: inputProp) {

  
  return (
    <div className="block">
      <label>{label}</label>
      <select 
        {...rest}
        {...register(name, { required: required })}
         className={errors[name] &&"border-red-600"}
      >
        {data.map((item,index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      {errors[name] && <Errror message={`${label} is required`} />}

    </div>
  )
}



  