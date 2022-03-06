import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import DataSelect from "../components/global/dataSelect";
import { prices } from "../components/Home/utils";
import { useForm, Controller } from "react-hook-form";
export default function BuyData() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bundle, setBundle] = useState(prices[0].prices);
  //   const [getNework, setGetNework] = useState([]);
  type form = {
    network?: string;
    PhoneNumber?: number;
    amount?: number;
    pin?: number;
    bundle?: string;
  };

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const network = ["MTN", "Airtel", "9mobile", "GLO"];

  const handleChangeNetwork = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const network = e.target.value;
    const bundle = prices.find((item) => item.network === network)!;
    setBundle(bundle.prices);
  };

  const submitForm = (values: form) => {
    console.log(values, getValues());
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      network: "MtN",
    },
  });

  return (
    <div className=" mb-40 mt-10   md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Buy Data
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Controller
            name="network"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <label>Network</label>
                <select
                  name={field.name}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChangeNetwork(e)
                  }
                >
                  {network.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </>
            )}
          />
          <DataSelect
            register={register}
            name="bundle"
            data={bundle}
            label="Data bundle"
            errors={errors}
          />
          <Input
            register={register}
            name="PhoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
          />
          {/* <Select
            register={register}
            name="PhoneNumber"
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
        className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
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
