import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";
import { validateBalanceAndPIN } from "../components/global/utils";
import { useUser } from "../components/context/userContext";
import axios from "axios";
import { useRouter } from "next/router";
import Success from "../components/global/alertSuccess";
import Error from "../components/global/alertError";

type form = {
  amount?: number;
  pin?: number;
};

export default function BonusWallet() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | "success" | "error">(null);

  const userContext = useUser();
  const user = userContext?.user!;
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = async (values: form) => {
    if (
      !Number(user.earnings) ||
      Number(user.earnings) < Number(values.amount)
    ) {
      setError("amount", {
        type: "earnings",
        message: "Insufficient Earnings!",
      });
      return;
    }
    if (values.pin !== user.pin) {
      setError("pin", {
        type: "wrongpin",
        message: "Incorrect Pin!",
      });
      return false;
    }
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/earnings",
        data: { values, user },
      });
      console.log(data);
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
    <div className=" mb-40 mt-10  md:ml-20  ">
      <main>
        {alert === "success" && <Success text="Transaction Successful" />}
        {alert === "error" && <Error text=" Transaction Error" />}

        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <section className="mb-5 text-xl  font-bold text-gray-800 ">
            Move Earnings to Wallet (Agents Only)
          </section>
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
            type="password"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
