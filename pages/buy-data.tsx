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
    getValues,
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
    const numberPrefix = values.phoneNumber?.toString().slice(0, 4);
    const MTNPrefixes = [
      "0806",
      "0803",
      "0704",
      "0706",
      "0906",
      "0702",
      "0814",
      "0810",
      "0813",
      "0816",
      "0903",
      "0703",
      "0913",
    ];
    const AirtelPrefixes = [
      "0901",
      "0808",
      "0907",
      "0812",
      "0708",
      "0701",
      "0902",
      "0802",
    ];
    const GloPrefixes = ["0905", "0805", "0705", "0815", "0807", "0811"];
    const EtisaltPrefixes = ["0909", "0818", "0908", "0809", "0817"];

    let isValidNumber;

    if (values.network === "Airtel") {
      isValidNumber = AirtelPrefixes.includes(numberPrefix!);
    }

    if (values.network === "GLO") {
      isValidNumber = GloPrefixes.includes(numberPrefix!);
    }

    if (values.network === "9mobile") {
      isValidNumber = EtisaltPrefixes.includes(numberPrefix!);
    }

    if (values.network === "MTN") {
      isValidNumber = MTNPrefixes.includes(numberPrefix!);
    }

    if (values.phoneNumber?.toString().length !== 10) {
      setError("phoneNumber", {
        type: "number",
        message: "Incorrect phone pumber!",
      });
      return;
    }

    if (!isValidNumber) {
      setError("phoneNumber", {
        type: "number",
        message: `Incorrect ${values.network} phone pumber!`,
      });
      return;
    }

    if (values.pin !== user.pin) {
      setError("pin", {
        type: "wrongpin",
        message: "Incorrect Pin!",
      });
      return;
    }

    if (values.amount! > user.walletBalance!) {
      setError("amount", {
        type: "amount",
        message: "Insufficent Funds!",
      });
      return;
    }
    setLoading(true);

    const requestData = { ...values, ...getValues() };
    try {
      await axios({
        method: "post",
        url: "/api/buyData",
        data: { values: requestData, user },
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
            maxLength={10}
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
