import Script from "next/script";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../components/context/userContext";
import Button from "../components/global/Button";
import Input from "../components/global/input";
declare global {
  interface Window {
    MonnifySDK: {
      initialize: (options: any) => void;
    };
  }
}
const Monify = () => {
  const [MonnifySDK, setMonnifySDK] = useState(window.MonnifySDK);
  const userContext = useUser();
  const user = userContext?.user;

  type form = {
    amount?: number;
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {
    if (values?.amount && values.amount < 100) {
      setError("amount", {
        type: "manual",
        message: "Amount must be greater than 100 naira",
      });
      return;
    }
    if (values.amount) {
      payWithMonnify(values.amount);
    }
  };

  function payWithMonnify(amount: Number) {
    MonnifySDK?.initialize({
      amount: amount,
      currency: "NGN",
      reference: new String(new Date().getTime()),
      customerFullName: user?.name,
      customerEmail: user?.email,
      apiKey: process.env.NEXT_PUBLIC_MONIFY_APIKEY,
      contractCode: "381608850007",
      paymentDescription: "QuadroRechnage Funding",

      onComplete: function (response: any) {
        console.log(response);
        location.assign("/dashboard");
      },
      onClose: function (data: any) {
        console.log(data);
      },
    });
  }
  return (
    <div className="my-14 mx-10 h-fit max-w-[30rem]  px-2">
      <div className="my-14 mx-10 h-fit max-w-[30rem] rounded-xl border py-10 px-2">
        <h3 className="mx-4 mb-4 text-xl font-bold text-gray-600">
          Fund with Monify
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
            <Button label="continue" />
          </form>
        </main>
      </div>
      <Script
        src="https://sdk.monnify.com/plugin/monnify.js"
        onLoad={() => {
          setMonnifySDK(window?.MonnifySDK);
        }}
      />
    </div>
  );
};
export default Monify;
