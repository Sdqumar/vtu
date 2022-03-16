import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
};

export default function AirtimeCash() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();
  const network = ["MTN", "Airtel", "9mobile", "GLO"];

  const submitForm = async (values: form) => {
    console.log(values);

    try {
      const { data } = await axios({
        method: "post",
        url: "/api/airtimeCash",
        data: { values, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mb-40 mt-10   md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Convert Airtime to Cash
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="network"
            data={network}
            label="Choose Network"
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
