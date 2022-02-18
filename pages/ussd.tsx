import type { NextPage } from "next";
import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";
import Select from "../components/global/select";

const bankList = [
  "UBA Bank",
  "First Bank",
  "GT Bank",
  "Access Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Sterling Bank",
  "Union Bank",
  "Zenith Bank",
  "FCMB",
  "Stanbic IBTC Bank",
  "Unity Bank",
  "JAIZ Bank",
  "Wema Bank",
];

const USSD: NextPage = () => {
  const [loading, setLoading] = useState(false);

  type form = {
    amount?: number;
    bank?: string;
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {};

  return (
    <div className="my-14 mx-10 h-fit max-w-[30rem] rounded-xl border py-10 px-2">
      <h3 className="mx-4 mb-4 text-xl font-bold text-gray-600">
        Fund with Bank USSD
      </h3>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className=" w-72 px-5"
        >
          <Select
            register={register}
            name="bank"
            data={bankList}
            label="Choose Bank"
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
};

export default USSD;
