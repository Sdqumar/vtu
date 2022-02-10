import Input from "../components/global/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";

export default function AirtimeTopUp() {
  const [loading, setLoading] = useState(false);
  type form = {
    network: string;
    PhoneNumber: number;
    amount: number;
    pin: number;
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {};
  return (
    <div>
      <section className="text-3xl ml-4  mt-10  font-bold text-gray-800">
        Buy Airtime
      </section>

      <main>
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="transition-all duration-700"
        >
          <Input
            register={register}
            name="network"
            label="Network"
            type="text"
            errors={errors}
          />
          <Input
            register={register}
            name="PhoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
          />
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
            type="number"
            errors={errors}
          />
           <Button label="Buy Airtime" loading={loading} />
        </form>
      </main>
    </div>
  );
}
