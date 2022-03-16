import Input from "../components/global/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import axios from "axios";
import { useUser } from "../components/context/userContext";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
};

export default function AirtimeTopUp() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const userContext = useUser();
  const user = userContext?.user!;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<form>();
  const network = ["MTN", "Airtel", "9mobile", "GLO"];
  const submitForm = async (values: form) => {
    console.log(values);

    try {
      const { data } = await axios({
        method: "post",
        url: "/api/buyAirtime",
        data: { values, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mb-40 mt-10 md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Buy Airtime
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
            name="phoneNumber"
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
            maxLength={4}
            type="password"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
