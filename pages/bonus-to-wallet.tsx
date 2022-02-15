import Input from "../components/global/Input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";

export default function BonusWallet() {
  const [loading, setLoading] = useState(false);

  type form = {
    amount?: number;
    pin?: number;
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {};

  

  return (
    <div className=" md:ml-20 mb-40  mt-10  ">
     
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="transition-all duration-700 w-96 shadow-lg rounded-md p-8"
        >
           <section className="text-xl mb-5  font-bold text-gray-800 ">
      Move Earnings to Wallet (Agents Only)
      </section>
          <Input
            register={register}
            name="amount"
            label="Amount"
            type="number"
            errors={errors}
          />
          <Input
            register={register}
            name="pin"
            label="PIN"
            type="password"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
