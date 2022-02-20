import { usePaystackPayment } from "react-paystack";
import { useUser } from "../context/userContext";

export default function Payment() {
  const userContext = useUser();
  const user = userContext?.user;
  const payment = { amount: 500, total: 502 };
  const config = {
    reference: new Date().getTime().toString(),
    email: user!.email,
    amount: payment?.total * 100,
    publicKey: "pk_test_cc89c527520c2442c1e462c3128f57442882a3ca",
    metadata: {
      ...user,
      ...payment,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "Name",
          value: user!.name,
        },
      ],
    },
  };

  const onSuccess = (reference: Function | undefined) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  const makePayment = () => {
    initializePayment(onSuccess, onClose);
  };

  return (
    <button onClick={makePayment} className="m-auto mb-10">
      make payment
    </button>
  );
}
