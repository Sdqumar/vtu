import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";
import { validatePhoneNumber } from "../components/global/utils";
import Success from "../components/global/alertSuccess";

type form = {
  network?: string;
  phoneNumber?: number;
  amount?: number;
  pin?: number;
};

export default function AirtimeCash() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();
  const network = ["MTN", "Airtel", "9mobile", "GLO"];

  const submitForm = async (values: form) => {
    const isValidNumber = validatePhoneNumber(setError, values);
    if (!isValidNumber) return;

    if (values.pin !== user.pin) {
      setError("pin", {
        type: "wrongpin",
        message: "Incorrect Pin!",
      });
      return false;
    }
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/airtimeCash",
        data: { values, user },
      });
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="  mb-40 mt-10 md:ml-20">
      <section className="my-5 mx-5 text-3xl font-bold  text-gray-800 md:mx-0">
        Convert Airtime to Cash
      </section>
      <main className="">
        <section className="mx-10 mb-4 max-w-4xl md:mx-0">
          <h2 className="font-medium">
            Before you fill form to convert airtime to cash Kindly note the
            conditions below:
          </h2>
          <ul className="list-disc">
            <li>
              Fill the form below correctly for airtime to Before you fill form
              to convert airtime to cash Kindly note the cash, any airtime
              transferred without filling the form shall be defaulted.
            </li>
            <li>
              The minimum amount is #500 and maximum for is #5,000. Glo is #1000
              maximum per transfer.
            </li>
            <li>
              If you want to send pin, please load it on any mtn sim and
              transfer to us
            </li>
            <li>
              You must send the airtime within 20 minutes or the transaction
              will be automatically cancelled
            </li>
            <li>To transfer mtn airtime: *600*recipient number*amount*pin#</li>
            <li>
              To change mtn transfer pin: *600*default pin*new pin*new pin# e.g
              *600*0000*new pin*new pin#
            </li>
            <li> To transfer 9mobile airtime: *223*pin*amount*number#</li>
            <li>
              To change 9mobile transfer pin: *247*default pin*new pin# e.g
              *247*0000*new pin#
            </li>
            <li>To transfer Glo airtime: *131*recipient number*amount*pin#</li>
            <li>
              To change Glo transfer pin: *132*default pin*new pin*new pin# e.g
              *132*0000*new pin#
            </li>
            <li>
              For MTN: Your wallet will be credited with 85%, For GLO:80%, For
              9MOBILE:75% of the amount of airtime sent.
            </li>
            <li>
              Take for instance for MTN #1000 airtime=#850, For GLO #1000
              airtime=#800, For 9MOBILE #1000 airtime=#750 will be credited.
            </li>
            <li>
              You must not send any amount different from the amount filled,
              defaulter shall be charged 20% extra.
            </li>
            <li>
              Airtime sent from another line different from the one you fill
              shall be credited with 20% extra charge.
            </li>
            <li>
              We accept airtime transfer only. Any VTU sent to us will not be
              credited to your wallet.
            </li>
          </ul>
        </section>
        <div className="w-96">
          {alert === "success" && <Success text="Transaction Successful" />}
        </div>

        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="network"
            data={network}
            label="Choose Network"
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
            name="phoneNumber"
            label="Sending From (number from which the airtime will be sent)"
            maxLength={11}
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
      </main>
    </div>
  );
}
