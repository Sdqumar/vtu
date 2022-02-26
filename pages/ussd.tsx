import type { NextPage } from "next";
import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";
import Select from "../components/global/select";
import { useUser } from "../components/context/userContext";

const BankUSSDs = (accountNumber: number, amount: number) => [
  {
    name: "Access bank",
    ussd: `*901*${amount}*${accountNumber}#`,
  },
  {
    name: "Diamond bank",
    ussd: `*710*777*${accountNumber}*${amount}*Pin#`,
  },

  {
    name: "Fidelity bank",
    ussd: `*770*${accountNumber}*${amount}#`,
  },
  {
    name: "First bank",
    ussd: `*894*${amount}*${accountNumber}#`,
  },
  {
    name: "First City Monument Bank Plc",
    ussd: `*329*${amount}*${accountNumber}#`,
  },
  {
    name: "GTBank",
    ussd: `*737*2*${amount}*${accountNumber}#`,
  },
  {
    name: "Heritage bank",
    ussd: `*322*030*${accountNumber}*${amount}#`,
  },
  {
    name: "JAIZ BANK",
    ussd: `*389*301*${accountNumber}*${amount}#`,
  },
  {
    name: "Keystone bank",
    ussd: `*7111*${amount}*${accountNumber}#`,
  },
  {
    name: "Polaris Bank",
    ussd: `*833*${amount}*${accountNumber}#`,
  },
  {
    name: "Stanbic IBTC Bank Ltd.",
    ussd: `*909*22*${amount}*${accountNumber}#`,
  },
  {
    name: "Sterling bank",
    ussd: `*822*5*${amount}*${accountNumber}#`,
  },
  {
    name: "Union bank",
    ussd: `*826*2*${amount}*${accountNumber}#`,
  },
  {
    name: "United Bank For Africa Plc",
    ussd: `*919*4*${accountNumber}*${amount}#`,
  },
  {
    name: "Unity Bank Plc",
    ussd: `*7799*2*${accountNumber}*${amount}#`,
  },
  {
    name: "Wema bank",
    ussd: `*945*${accountNumber}*${amount}#`,
  },
];
const banks = [
  "Access bank",
  "Diamond bank",
  "Fidelity bank",
  "First bank",
  "First City Monument Bank Plc",
  "GTBank",
  "Heritage bank",
  "JAIZ BANK",
  "Keystone bank",
  "Polaris Bank",
  "Stanbic IBTC Bank Ltd.",
  "Sterling bank",
  "Union bank",
  "United Bank For Africa Plc",
  "Unity Bank Plc",
  "Wema bank",
  "Zenith bank",
];

const USSD: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [USSD, setUSSD] = useState<null | string>(null);
  const userContext = useUser();
  const user = userContext?.user;

  type form = {
    amount?: number;
    bank?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {
    const banks = BankUSSDs(user!.accountNumber!, values.amount!);

    banks.find((bank) => {
      bank.name === values.bank && setUSSD(bank.ussd);
    });
  };

  return (
    <div className="my-14 mx-10 h-fit w-[23rem] rounded-xl border py-10 px-2">
      <h3 className="mx-4 mb-4 text-xl font-bold text-gray-600">
        Fund with Bank USSD
      </h3>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className=" w-72 px-5"
        >
          <Select
            register={register}
            name="bank"
            data={banks}
            label="Choose Bank"
            errors={errors}
          />
          <Input
            register={register}
            name="amount"
            label="amount"
            type="number"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
        {USSD && (
          <div className=" p-4 font-normal">
            <h4 className="my-4 text-xl font-medium">
              Follow this instructions
            </h4>
            1. Copy the code below and dial it on your phone to complete your
            payment
            <br />
            <br />
            2. Choose WEMA BANK as the beneficiary
            <br />
            <br />
            3. Proceed to complete the payment. It will reflect in your wallet
            instantly
            <h4 className="my-4 text-center text-xl font-medium">{USSD}</h4>
            Charges = 1 % of the amount you transfer
          </div>
        )}
      </main>
    </div>
  );
};

export default USSD;
