import Input from "../components/global/input";
import { useEffect, useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import { validateBalanceAndPIN } from "../components/global/utils";
import { useRouter } from "next/router";
import Success from "../components/global/alertSuccess";
import Error from "../components/global/alertError";

type form = {
  exam?: string;
  email?: string;
  pin?: number;
  amount?: number;
};

const exam = [
  { name: "WAEC Card", amount: "N2000" },
  { name: "NECO Card", amount: "N950" },
  { name: "NABTEB Card", amount: "N900" },
  { name: "JAMB UTME Form", amount: "N3450 " },
];

export default function Education() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | "success" | "error">(null);

  const userContext = useUser();
  const user = userContext?.user!;
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<form>();

  const watchExam = watch("exam", "WAEC Card - N2000");

  useEffect(() => {
    if (watchExam) {
      const amount = watchExam.split("-")[1].slice(2);
      setValue("amount", Number(amount));
    }
  }, [watchExam]);

  const submitForm = async (values: form) => {
    const isValidBalanceAndPIN = validateBalanceAndPIN(setError, values, user);
    if (!isValidBalanceAndPIN) return;
    setLoading(true);

    try {
      const { data } = await axios({
        method: "post",
        url: "/api/buyExam",
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
    <div className=" mb-40 mt-10 md:ml-20">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Exam Card
      </section>

      <main className="">
        {alert === "success" && <Success text="Transaction Successful" />}
        {alert === "error" && <Error text=" Transaction Error" />}
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="exam"
            data={exam.map((item) => item.name + " - " + item.amount)}
            label="Choose Exam type"
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
            name="email"
            label="Email"
            type="email"
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
