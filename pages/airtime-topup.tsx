import Input from "../components/global/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Dialog } from "@mui/material";

import { useUser } from "../components/context/userContext";
import {
  validateBalance,
  validatePhoneNumber,
} from "../components/global/utils";
import Link from "next/link";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
};

export default function AirtimeTopUp() {
  const [loading, setLoading] = useState(false);

  const userContext = useUser();
  const user = userContext?.user!;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<form>();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<form>();
  const network = [
    { name: "MTN", id: 1 },
    { name: "AIRTEL", id: 4 },
    { name: "9MOBILE", id: 3 },
    { name: "GLO", id: 2 },
  ];

  const handleTransaction = async () => {
    let networkId = network.find((network) => {
      return network.name == values?.network;
    });

    setLoading(true);
    try {
      await axios({
        method: "post",
        url: "/api/buyAirtime",
        data: { values, user, networkId: networkId?.id },
      });
      toast.success("Transaction Successful!");
      setLoading(false);
      setOpen(false);
      setIsSuccess(true);
    } catch (error) {
      toast.error("Transaction Error!");
      console.log(error);
      setLoading(false);
      setOpen(false);
    }
  };
  const submitForm = async (values: form) => {
    const isValidNumber = validatePhoneNumber(setError, values);
    if (!isValidNumber) return;
    const isValidBalance = validateBalance(setError, values, user);
    if (!isValidBalance) return;
    setOpen(true);
    setValues(getValues());
  };

  const handleCloseSuccess = () => {
    reset();
    setIsSuccess(false);
  };
  return (
    <div className=" mb-40 mt-10 md:ml-20  ">
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
            You&apos;re about to buy {values?.network} ₦{values?.amount} Airtime
            to {values?.phoneNumber}
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
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Buy Airtime
      </section>
      {!isSuccess && (
        <main className="flex  flex-wrap">
          <form
            onSubmit={handleSubmit((formValues) => submitForm(formValues))}
            className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
          >
            <Select
              register={register}
              name="network"
              data={network.map((network) => network.name)}
              label="Choose Network"
              errors={errors}
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
              name="amount"
              label="Amount"
              type="number"
              errors={errors}
            />

            <Button label="continue" loading={loading} />
          </form>
        </main>
      )}

      {isSuccess && (
        <div className="mx-4  flex w-96 flex-col justify-center p-8  md:justify-start ">
          <h4
            onClick={handleCloseSuccess}
            className=" mb-5 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100"
          >
            Buy Airtime
          </h4>
          <h4 className=" mb-5 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100">
            <Link href="/transactions">Check Transaction</Link>
          </h4>
          <h4 className=" mb-2 cursor-pointer rounded-lg border bg-gray-100 p-2 py-3 px-3 text-center text-xl font-medium hover:bg-green-100">
            <Link href="/dashboard">Return To Dashboard</Link>
          </h4>
        </div>
      )}

      <div className="w-90 mx-4 mt-10 ">
        <h2 className="bg-[#fff0c2]  p-4  text-[#1f1d18]">
          MTN Airtime VTU *556#
        </h2>

        <h2 className="bg-[#c3e6cb]  p-4 text-[#155724]">
          9mobile Airtime VTU *232#
        </h2>
        <h2 className="bg-[#f5c6cb] p-4 text-[#721c24]">
          Airtel Airtime VTU *123#
        </h2>
        <h2 className="bg-[#c3e6cb]  p-4 text-[#155724]">
          Glo Airtime VTU #124#.
        </h2>
      </div>
    </div>
  );
}
