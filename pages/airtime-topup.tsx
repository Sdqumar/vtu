import Input from "../components/global/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../components/context/userContext";
import {
  validateBalance,
  validatePhoneNumber,
} from "../components/global/utils";
import { useRouter } from "next/router";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
};

export default function AirtimeTopUp() {
  const [loading, setLoading] = useState(false);

  const userContext = useUser();
  const user = userContext?.user!;
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<form>();
  const network = [
    { name: "MTN", id: 1 },
    { name: "AIRTEL", id: 4 },
    { name: "9MOBILE", id: 3 },
    { name: "GLO", id: 2 },
  ];
  const submitForm = async (values: form) => {
    const isValidNumber = validatePhoneNumber(setError, values);
    if (!isValidNumber) return;
    const isValidBalance = validateBalance(setError, values, user);
    if (!isValidBalance) return;
    let networkId = network.find((network) => {
      return network.name == values.network;
    });

    setLoading(true);
    try {
      await axios({
        method: "post",
        url: "/api/buyAirtime",
        data: { values, user, networkId: networkId?.id },
      });
      toast.success("Transaction Successful!");
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Transaction Error!");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" mb-40 mt-10 md:ml-20  ">
      <Toaster />
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
            data={network.map((network) => network.name)}
            label="Choose Network"
            errors={errors}
          />
          <Input
            register={register}
            name="phoneNumber"
            label="Phone Number"
            maxLength={11}
            errors={errors}
          />

          <Input
            register={register}
            name="amount"
            label="Amount"
            type="number"
            errors={errors}
          />

          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
