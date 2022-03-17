import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import { validateBalanceAndPIN } from "../components/global/utils";

type form = {
  provider?: string;
  plan?: string;
  cardNumber?: number;
  pin?: number;
};

export default function CableSubscription() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<form>();
  const providers = ["DSTV", "StarTimes", "GoTv", "ShowMax"];

  const watchNetwork = watch("provider", "DSTV");

  const submitForm = async (values: form) => {
    const requestData = { ...values, ...getValues() };
    console.log(requestData);
    const isValidBalanceAndPIN = validateBalanceAndPIN(setError, values, user);
    if (!isValidBalanceAndPIN) return;
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/cableSub",
        data: { values: requestData, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      provider: "DSTV",
    },
  });

  return (
    <div className=" mb-40 mt-10   md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Buy Cable Subscription
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="bundle"
            data={providers}
            label="Data bundle"
            errors={errors}
          />
          <Select
            register={register}
            name="plan"
            data={list}
            label="Choose plan"
            errors={errors}
          />
          <Input
            register={register}
            name="amount"
            label="Amount"
            type="number"
            errors={errors}
            disabled
          />
          <Input
            register={register}
            name="cardNumber"
            label="Card Number"
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
