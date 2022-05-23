import Input from "../components/global/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../components/context/userContext";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const userContext = useUser();
  const user = userContext?.user;

  type form = {
    name?: string;
    email?: string;
    phoneNumber?: number;
    defaultValue?: string | number | undefined;
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
    <div className=" mt-20 flex h-fit w-full flex-wrap justify-center gap-10 md:ml-20 md:justify-start ">
      <main className="flex  flex-wrap ">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <section className="mb-5 text-xl  font-bold text-gray-800 ">
            My Profile
          </section>
          <Input
            register={register}
            defaultValue={user?.name}
            name="name"
            label="Full Name"
            errors={errors}
            disabled={!edit}
          />
          <Input
            register={register}
            defaultValue={user?.email}
            name="email"
            label="Email Address"
            errors={errors}
            disabled={!edit}
          />
          <Input
            register={register}
            defaultValue={Number(user?.phoneNumber)}
            name="phoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
            disabled={!edit}
          />

          <h3
            onClick={handleUpdate}
            className="bg-primary mx-auto w-full cursor-pointer rounded-md p-2 text-center font-medium text-white"
          >
            {edit ? "Update" : "Edit"}
          </h3>
        </form>
      </main>
    </div>
  );
}
