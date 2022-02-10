import Input from "../components/global/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";

export default function AirtimeTopUp() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  type form = {
    network?: string;
    PhoneNumber?: number;
    amount?: number;
    pin?: number;
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const network = ["MTN", "Airtel", "9mobile", "GLO"];
  const submitForm = (values: form) => {};

  const handleShowForm = () => {
    showForm? setShowForm(false):setShowForm(true)
  };

  return (
    <div className=" md:ml-20 mb-40">
      <section className="text-3xl ml-4 mt-16  font-bold text-gray-800">
        Buy Airtime
      </section>

      <main className="  mt-5 ">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="transition-all duration-700 w-96 shadow-lg rounded-md p-8"
        >
          <Select
            register={register}
            name="network"
            data={network}
            label="Network"
            errors={errors}
          />
          <Input
            register={register}
            name="PhoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
          />
          <Select
            register={register}
            name="network"
            data={list}
            label="Choose from beneficiary"
            errors={errors}
          />
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
          <Button label="Buy Airtime" loading={loading} />
        </form>
      </main>

      <section>
        <button className="w-40" onClick={handleShowForm}>
          Save to Beneficiary
        </button>
        {showForm && <BeneficiaryForm/>}
      </section>
    </div>
  );
}

export function BeneficiaryForm() {
  const [loading, setLoading] = useState(false);
  type form = {
    PhoneNumber?: number;
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
        className="transition-all duration-700 w-96 shadow-lg rounded-md p-8"
      >
        <Input
          register={register}
          name="PhoneNumber"
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
