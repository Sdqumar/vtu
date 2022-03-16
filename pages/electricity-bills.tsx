import Input from "../components/global/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import axios from "axios";
import { useUser } from "../components/context/userContext";

type form = {
  company?: string;
  meterNo?: number;
  amount?: number;
  pin?: number;
};

export default function ElectricityBills() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const userContext = useUser();
  const user = userContext?.user!;

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const company = [
    "Ibadan Electricity Distribution Company - IBEDC",
    "Abuja Electricity Distribution Company - AEDC",
    "Ikeja Electricity Distribution Company - IKEDC",
    "Kano Electricity Distribution Company - KEDCO",
    "Jos Electricity Distribution Company - JED",
    "Port Harcourt Electricity Distribution Company - PHED",
  ];
  const submitForm = async (values: form) => {
    console.log(values);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/electricSub",
        data: { values: values, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mb-40 mt-10 md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Electricity Bills
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="company"
            data={company}
            label="Distribution Company"
            errors={errors}
          />
          <Input
            register={register}
            name="meterNo"
            label="Meter Number"
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
            name="phoneNumber"
            label="Phone Number"
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
