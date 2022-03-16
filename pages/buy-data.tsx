import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { prices } from "../components/Home/utils";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import Select from "../components/global/select";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
  bundle?: string;
};

export default function BuyData() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bundle, setBundle] = useState(prices[0].prices);

  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<form>({});

  const network = ["MTN", "Airtel", "9mobile", "GLO"];

  const submitForm = async (values: form) => {
    console.log(values, getValues());

    // const requestData = { ...values, ...getValues() };
    // console.log(requestData);
    // try {
    //   const { data } = await axios({
    //     method: "post",
    //     url: "/api/buyData",
    //     data: { values: requestData, user },
    //   });
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  return (
    <div className=" mb-40 mt-10   md:ml-20  ">
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
            name="phoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
          />
          {/* <Select
            register={register}
            name="phoneNumber"
            required={false}
            data={list}
            label="Choose from beneficiary"
            errors={errors}
          /> */}

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
            maxLength={4}
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
        <section>
          <button className="ml-10 w-40" onClick={handleShowForm}>
            Save to Beneficiary
          </button>
          {showForm && <BeneficiaryForm />}
        </section>
      </main>
    </div>
  );
}

export function BeneficiaryForm() {
  const [loading, setLoading] = useState(false);
  type form = {
    phoneNumber?: number;
    name?: string;
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const submitForm = (values: form) => {};

  return (
    <main className="  mt-5 ">
      <form
        onSubmit={handleSubmit((formValues) => submitForm(formValues))}
        className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
      >
        <Input
          register={register}
          name="phoneNumber"
          label="Phone Number"
          type="number"
          errors={errors}
        />
        <Input
          register={register}
          name="name"
          label="Name"
          type="name"
          errors={errors}
        />
        <Button label="Save" loading={loading} />
      </form>
    </main>
  );
}
