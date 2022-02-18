import React, { useState } from "react";
import FormBtn from "./formBtn";
import SignIn from "./signin";
import SignUp from "./signup";

const Form = () => {
  const [active, setActive] = useState(false);

  return (
    <main className="m-5 mx-auto w-[23rem]  ">
      <section className="mt-5 ml-4 flex max-w-fit justify-center rounded-3xl bg-teal-100 py-1">
        <FormBtn
          title="Sign In"
          active={!active}
          onClick={() => {
            setActive(false);
          }}
        />
        <FormBtn
          title="Sign Up"
          active={active}
          onClick={() => {
            setActive(true);
          }}
        />
      </section>

      <section>{active ? <SignUp /> : <SignIn />}</section>
    </main>
  );
};
export default Form;
