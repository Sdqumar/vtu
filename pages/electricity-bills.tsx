import Input from "../components/global/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";

export default function ElectricityBills() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  type form = {
    company?: string;
    meterNo?: number;
    amount?: number;
    pin?: number;
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const company = [
    "Ibadan Electricity Distribution Company - IBEDC",
    "Abuja Electricity Distribution Company - AEDC",
    "Ikeja Electricity Distribution Company - IKEDC",
    "Kano Electricity Distribution Company - KEDCO",
    "Jos Electricity Distribution Company - JED",
    "Port Harcourt Electricity Distribution Company - PHED",
  ];
  const submitForm = (values: form) => {
    console.log(values);
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  return (
    <div className=" mb-40 mt-10 md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Electricity Bills
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="company"
            data={company}
            label="Distribution Company"
            errors={errors}
          />
          <Input
            register={register}
            name="meterNo"
            label="Meter Number"
            type="number"
            errors={errors}
          />
          {/* <Select
            register={register}
            name="phoneNumber"
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
