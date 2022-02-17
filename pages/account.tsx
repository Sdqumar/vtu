import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import { useForm } from "react-hook-form";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  type form = {
    name?: string;
    email?: string;
    PhoneNumber?: number;
  };

  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();
  const values = getValues();
  const submitForm = (values: form) => {};
  const handleUpdate = () => {
    !edit && setEdit(true);

    if (edit) {
      trigger();
      console.log(values);
    }
  };
  return (
    <div className=" md:ml-20 justify-center md:justify-start h-fit mt-20 gap-10 flex flex-wrap ">
      <main className="flex  flex-wrap ">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="transition-all duration-700 w-96 shadow-lg rounded-md p-8"
        >
          <section className="text-xl mb-5  font-bold text-gray-800 ">
            My Profile
          </section>
          <Input
            register={register}
            name="name"
            label="Full Name"
            errors={errors}
            disabled={!edit}
          />
          <Input
            register={register}
            name="email"
            label="Email Address"
            errors={errors}
            disabled={!edit}
          />
          <Input
            register={register}
            name="PhoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
            disabled={!edit}
          />
          {edit && (
            <Input
              register={register}
              name="pin"
              label="pin"
              type="number"
              errors={errors}
            />
          )}
          <h3
            onClick={handleUpdate}
            className="bg-primary rounded-md w-full mx-auto font-medium cursor-pointer text-white text-center p-2"
          >
            {edit ? "Update" : "Edit"}
          </h3>
        </form>
      </main>
      <UpdatePIN/>
    </div>
  );
}
export function UpdatePIN() {
  const [loading, setLoading] = useState(false);

  type form = {
    oldpin?: number;
    pin?: number;
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();

  const submitForm = (values: form) => {};

  return (
    <div className="   ">
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="transition-all duration-700 w-96 shadow-lg rounded-md p-8"
        >
          <section className="text-xl mb-5  font-bold text-gray-800 ">
            Transaction PIN
          </section>
          <Input
            register={register}
            name="oldpin"
            label="Old PIN"
            type="number"
            errors={errors}
          />
          <Input
            register={register}
            name="pin"
            label="New PIN"
            type="number"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
      </main>
    </div>
  );
}
