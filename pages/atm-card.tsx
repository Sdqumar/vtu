import type { NextPage } from "next";
import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";
import { useUser } from "./../components/context/userContext";
import Script from "next/script";
import { useRouter } from "next/router";
declare const MonnifySDK: any;

type form = {
  amount?: number;
};

const ATMCard: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const userContext = useUser();
  const user = userContext?.user;
  const router = useRouter();
  const customer = {
    email: user!.email,
    name: user!.name!,
    uid: user!.uid!,
    number: user!.phoneNumber!,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  function payWithMonnify(payment: { total: number }) {
    MonnifySDK.initialize({
      amount: payment.total,
      currency: "NGN",
      reference: "" + Math.floor(Math.random() * 1000000000 + 1),
      customerName: customer.name,
      customerEmail: customer.email,
      apiKey: "MK_TEST_AWZX1QJ3CJ",
      contractCode: "3936455328",
      paymentDescription: "QuadroRecharge ATM Fund",
      isTestMode: true,
      metadata: {
        ...customer,
        ...payment,
      },
      paymentMethods: ["CARD"],
      onComplete: function (response: string) {},
      onClose: function () {
        router.push("/dashboard");
      },
    });
  }
  const submitForm = async (values: form) => {
    const amount = Number(values.amount)!;

    const payment = { amount, total: amount + amount * 0.02 };

    payWithMonnify(payment);
  };

  return (
    <div className="my-14 mx-10 h-fit max-w-[30rem] rounded-xl border py-10 px-2">
      <h3 className="mx-4 mb-4 text-xl font-bold text-gray-600">
        Fund with ATM Card
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
          <span className="font-medium">Charges : 2%</span>
          <Button label="continue" loading={loading} />
        </form>
      </main>
      <Script src="https://sdk.monnify.com/plugin/monnify.js" />
    </div>
  );
};

export default ATMCard;
