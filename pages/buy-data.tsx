import Input from "../components/global/input";
import { useEffect, useState } from "react";
import Button from "../components/global/Button";
import { prices } from "../components/Home/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import Select from "../components/global/select";
import toast, { Toaster } from "react-hot-toast";
import {
  validateBalance,
  validatePhoneNumber,
} from "../components/global/utils";
import { Dialog } from "@mui/material";
import Link from "next/link";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  bundle?: string;
};

export default function BuyData() {
  const [loading, setLoading] = useState(false);
  const [bundle, setBundle] = useState(prices[0].prices);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [values, setValues] = useState<form>();

  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    setError,
    setValue,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<form>({});

  const network = ["MTN SME", "AIRTEL"];
  const watchNetwork = watch("network", "MTN SME");
  const watchBundle = watch(
    "bundle",
    `${bundle[0].size} - ${bundle[0].price} - ${bundle[0].duration}`
  );

  useEffect(() => {
    if (!isSuccess) {
      let bundles = prices.find((item) => item.network === watchNetwork);
      let bundle = bundles?.prices;
      if (bundle) {
        setBundle(bundle);

        setValue(
          "bundle",
          `${bundle[0].size} - ${bundle[0].price} - ${bundle[0].duration}`
        );
        const amount = bundles!.prices[0].price.slice(1);
        setValue("amount", Number(amount));
      }
    }
  }, [watchNetwork, bundle]);

  useEffect(() => {
    const amount = watchBundle?.split("-")[1]?.slice(2);
    setValue("amount", Number(amount));
  }, [watchBundle]);

  const handleTransaction = async () => {
    const plan = bundle.find((plan) => {
      return Number(plan.price.slice(1)) == values?.amount;
    });
    const planCode = plan?.planCode;

    setLoading(true);

    try {
      await axios({
        method: "post",
        url: "/api/buyData",
        data: { values, user, planCode },
      });
      toast.success("Transaction Successful!");
      setLoading(false);
      setOpen(false);
      setIsSuccess(true);
    } catch (error) {
      toast.error("Transaction Error!");
      console.log(error);
      setLoading(false);
    }
  };

  const submitForm = async (values: form) => {
    const isValidNumber = validatePhoneNumber(setError, values!);
    if (!isValidNumber) return;
    const isValidBalance = validateBalance(setError, values!, user);
    if (!isValidBalance) return;
    setOpen(true);
    setValues(getValues());
  };
  const handleCloseSuccess = () => {
    reset();
    setIsSuccess(false);
  };
  return (
    <div className=" mb-40 mt-10 md:ml-20">
      <Toaster />
      <Dialog onClose={() => setOpen(false)} open={open}>
        <div className="p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-15 m-auto h-10 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
            />
          </svg>
          <h2 className="mt-4 text-center text-2xl font-bold uppercase">
            Dear {user.displayName}
          </h2>
          <h4 className="pt-4 text-sm">
            You&apos;re about to buy {values?.network}{" "}
            {values?.bundle?.split(" -")[0]}
            {values?.bundle?.split(" -")[1]} to {values?.phoneNumber}
          </h4>
          <div className="m-auto mb-5 flex">
            <Button
              label="cancel"
              style="bg-red-700 mr-5"
              onClick={() => setOpen(false)}
              disabled={loading}
            />
            <Button label="ok" onClick={handleTransaction} loading={loading} />
          </div>
        </div>
      </Dialog>
      <section className="my-5 ml-4 text-3xl font-bold text-gray-800">
        Buy Data
      </section>
      {!isSuccess && (
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

            <Button label="continue" />
          </form>
        </main>
      )}

      {isSuccess && (
        <div className="mx-4 flex  w-96 flex-col  justify-start ">
          <h4
            className=" mb-5 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100"
            onClick={handleCloseSuccess}
          >
            Buy Data
          </h4>
          <h4 className=" mb-5 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100">
            <Link href="/transactions">Check Transaction</Link>
          </h4>
          <h4 className=" mb-2 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100">
            <Link href="/dashboard">Return To Dashboard</Link>
          </h4>
        </div>
      )}

      <div className="mx-4 mt-10 w-96 ">
        <h2 className="bg-[#fff0c2]  p-4 text-[#1f1d18]">MTN [SME] *461*4#</h2>
        <h2 className="bg-[#fff0c2]  p-4 text-[#1f1d18]">
          MTN [Gifting] *131*4# or *460*260#
        </h2>
        <h2 className="bg-[#c3e6cb]  p-4 text-[#155724]">
          9phone [Gifting] *228#
        </h2>
        <h2 className="bg-[#f5c6cb]  p-4 text-[#721c24]">Airtel *140#</h2>
        <h2 className="bg-[#c3e6cb]  p-4 text-[#155724]">Glo *127*0#.</h2>
      </div>
    </div>
  );
}
