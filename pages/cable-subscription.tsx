import Input from "../components/global/input";
import { useEffect, useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";

type form = {
  provider?: string;
  plan?: string;
  cardNumber?: number;
  amount?: number;
};

const getPlans = async () => {
  return axios("/api/cableList");
};

export default function CableSubscription() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<
    null | { name: string; variation_amount: string }[]
  >(null);
  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const providers = ["DSTV", "StarTimes", "GoTv", "ShowMax"];
  const watchProviders = watch("provider", "DSTV");
  const watchplan = watch("plan");

  // const { data, isLoading } = useQuery("plans", getPlans, {
  //   staleTime: Infinity,
  // });

  // useEffect(() => {
  //   if (data !== undefined && !isLoading) {
  //     const [plans] = data?.data?.data?.filter(
  //       (item: { serviceID: string }) =>
  //         item.serviceID === watchProviders?.toLowerCase()
  //     );
  //     setList(plans.varations);
  //     setValue("plan", plans.varations[0].name);
  //   }
  // }, [watchProviders, data]);

  useEffect(() => {
    const amount = list?.find(
      (item) => item.name === watchplan
    )?.variation_amount;
    setValue("amount", Number(amount));
  }, [watchplan]);

  const submitForm = async (values: form) => {
    console.log(values);

    try {
      const { data } = await axios({
        method: "post",
        url: "/api/validateCard",
        data: { values, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
            name="provider"
            data={providers}
            label="Choose provider"
            errors={errors}
          />
          <Select
            register={register}
            name="plan"
            data={list?.map((item) => item.name)}
            label="Choose plan"
            errors={errors}
          />
          <Input
            register={register}
            name="amount"
            label="Amount"
            type="number"
            errors={errors}
            // disabled
          />
          <Input
            register={register}
            name="cardNumber"
            label="Card Number"
            type="number"
            errors={errors}
          />

          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
