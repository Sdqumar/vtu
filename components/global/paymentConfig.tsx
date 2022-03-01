import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const onSuccess = (reference: string) => {
  console.log(reference);
};

const onClose = () => {
  console.log("closed");
};
type payment = {
  total: number;
};
type user = {
  name: string;
  email: string;
};
type props = {
  user: user;
  payment: payment;
  // disable: boolean;
};
const PaystackHook = ({ user, payment }: props) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: payment.total * 100,
    // channels: "bank",
    publicKey: "pk_test_cc89c527520c2442c1e462c3128f57442882a3ca",
    metadata: {
      ...user,
      ...payment,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "Name",
          value: user.name,
        },
      ],
    },
  };
  const initializePayment = usePaystackPayment(config);

  initializePayment();
  return <div></div>;
};

export default PaystackHook;
