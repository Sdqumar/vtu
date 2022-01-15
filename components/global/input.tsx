import { UseFormRegister } from "react-hook-form";
import Errror from "./error";

type signup ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:number;
}

type inputProp ={
    register:UseFormRegister<signup>;
    name:"firstName" | "lastName" | "email" | "password" | "phoneNumber";
    label:"First name" | "Last name" | "Email" | "Password" | "Phone number";
    required?:boolean;
    errors:any;
    type?:string;
    containerStyle?:string;    
    style?:string;    
}

export default function Input({ register, name, label, required = true, errors, type = 'text',containerStyle='', style = '', ...rest }:inputProp) {


  return (
    <div className='my-2'>
      <label className="">{label}</label>
      <input
        {...register(name, { required: required })}
        type={type}
        {...rest}
        className={` ${style} ${errors[name] && "border-red-600"}`}

      />
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>

  )
}