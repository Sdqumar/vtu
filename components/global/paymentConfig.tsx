import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { v4 as uuidv4 } from "uuid";

const onClose = () => {
  console.log("closed");
};
type payment = {
  total: number;
};
type user = {
  name: string;
  email: string;
  uid: string;
};
type props = {
  user: user;
  payment: payment;
};
const PaystackHook = ({ user, payment }: props) => {
  const router = useRouter();
  const onSuccess = (reference: string) => {
    console.log(reference);
    router.push("/dashboard");
  };
  const config = {
    reference: uuidv4(),
    email: user.email,
    amount: payment.total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLICK_KEY!,
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

  initializePayment(onSuccess);
  return <div></div>;
};

export default PaystackHook;
