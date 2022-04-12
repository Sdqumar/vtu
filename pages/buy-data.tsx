import Input from "../components/global/input";
import { useEffect, useState } from "react";
import Button from "../components/global/Button";
import { prices } from "../components/Home/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import Select from "../components/global/select";
import Success from "../components/global/alertSuccess";
import Error from "../components/global/alertError";
import Router, { useRouter } from "next/router";
import {
  validateBalanceAndPIN,
  validatePhoneNumber,
} from "../components/global/utils";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
  bundle?: string;
};

export default function BuyData() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | "success" | "error">(null);
  const [bundle, setBundle] = useState(prices[0].prices);

  const userContext = useUser();
  const user = userContext?.user!;
  const router = useRouter();
  const {
    register,
    setError,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<form>({});

  const network = ["MTN", "Airtel", "9mobile", "GLO"];
  const watchNetwork = watch("network", "MTN");
  const watchBundle = watch(
    "bundle",
    `${bundle[0].size} - ${bundle[0].price} - ${bundle[0].duration}`
  );

  useEffect(() => {
    const bundle = prices.find((item) => item.network === watchNetwork);
    setBundle(bundle!.prices);
  }, [watchNetwork]);

  useEffect(() => {
    const amount = watchBundle?.split("-")[1].slice(2);
    setValue("amount", Number(amount));
  }, [watchBundle]);

  const submitForm = async (values: form) => {
    const plan = bundle.find((plan) => {
      return Number(plan.price.slice(1)) == values.amount;
    });

    const planCode = plan?.planCode;

    const isValidNumber = validatePhoneNumber(setError, values);
    if (!isValidNumber) return;

    const isValidBalanceAndPIN = validateBalanceAndPIN(setError, values, user);
    if (!isValidBalanceAndPIN) return;
    setLoading(true);

    try {
      await axios({
        method: "post",
        url: "/api/buyData",
        data: { values, user, planCode },
      });
      setAlert("success");
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setAlert("error");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" mb-40 mt-10 md:ml-20">
      {alert === "success" && <Success text="Transaction Successful" />}
      {alert === "error" && <Error text=" Transaction Error" />}
      <section className="my-5 ml-4 text-3xl font-bold text-gray-800">
        Buy Data
      </section>
      <main className="flex flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="network"
            data={network}
            label="Network"
            errors={errors}
          />

          <Select
            register={register}
            name="bundle"
            data={bundle.map(
              (item) => `${item.size} - ${item.price} - ${item.duration}`
            )}
            label="Data bundle"
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
            name="phoneNumber"
            label="Phone Number"
            maxLength={11}
            errors={errors}
          />

          <Input
            register={register}
            name="pin"
            label="PIN"
            type="password"
            maxLength={4}
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
