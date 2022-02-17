import type { NextPage } from "next";
import Link from "next/link";
import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";

const BankTransfer: NextPage = () => {

    const [loading, setLoading] = useState(false);

  type form = {
    amount?: number;
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {};

  return (
    <div className="border rounded-xl h-fit py-10 max-w-[30rem] my-14 mx-10 px-2">
      <h3 className="text-xl mx-4 mb-4 font-bold text-gray-600">
        Fund with Bank 
      </h3>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className=" w-72 px-5"
        >
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

export default BankTransfer;
